<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginRegisterController extends Controller
{
    // Método para registrar un nuevo usuario
    public function register(Request $request)
    {
        // Validar los datos del formulario
        $validate = Validator::make($request->all(), [
            // Definir reglas de validación para los campos del formulario
        ]);

        // Manejar errores de validación
        if($validate->fails()){
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        // Crear el nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // Preparar la respuesta
        $data['user'] = $user;
        $response = [
            'status' => 'success',
            'message' => 'User is created successfully.',
            'data' => $data,
        ];

        return response()->json($response, 201);
    }

    // Método para autenticar a un usuario
    public function login(Request $request)
    {
        // Validar los datos del formulario
        $validate = Validator::make($request->all(), [
            // Definir reglas de validación para los campos del formulario
        ]);

        // Manejar errores de validación
        if($validate->fails()){
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);  
        }

        // Verificar la existencia del correo electrónico
        $user = User::where('email', $request->email)->first();

        // Verificar la contraseña
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid credentials'
                ], 401);
        }

        // Generar un token de acceso
        $data['token'] = $user->createToken($request->email)->plainTextToken;
        $data['user'] = $user;
        
        // Preparar la respuesta
        $response = [
            'status' => 'success',
            'message' => 'User is logged in successfully.',
            'data' => $data,
        ];

        return response()->json($response, 200);
    } 

    // Método para cerrar sesión
    public function logout(Request $request)
    {
        // Obtener el usuario autenticado
        $user = auth()->user();
    
        if ($user) {
            // Revocar todos los tokens del usuario
            auth()->tokens()->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'User is logged out successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'User not authenticated'
            ], 401);
        }
    }

    // Método para obtener todos los usuarios
    public function show()
    {
        try {
            // Obtener todos los usuarios
            $users = User::all();

            // Devolver una respuesta con todos los usuarios
            return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            // Manejo de errores: error al obtener usuarios
            return response()->json(['error' => 'Error al obtener usuarios'], 500);
        }
    }

    // Método para obtener usuarios por departamento
    public function obtenerUsuariosPorDepartamento($departamento_id)
    {
        // Obtener todos los usuarios con el ID de departamento proporcionado
        $users = User::where('departamento_id', $departamento_id)->get();

        // Devolver los datos como respuesta JSON
        return response()->json($users);
    }

    // Método para actualizar un usuario
    public function update(Request $request, User $user)
    {
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            // Definir reglas de validación para los campos del formulario
            'name' => 'string|max:250',
            'email' => 'string|email:rfc,dns|max:250|unique:users,email',
            'password' => 'min:8|confirmed',
            'especialidad_id'=> 'integer',
            'departamento_id'=> 'integer',
            'horasTotales' => 'integer'
        ]);
    
        // Manejar errores de validación
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Actualizar el usuario
        $user->update($request->all());
    
        // Preparar la respuesta
        return new UserResource($user);
    }
}
