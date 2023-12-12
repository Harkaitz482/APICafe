<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Modulo;
use Illuminate\Support\Facades\File;


class JefeEstudiosController extends Controller
{
    public function index()
    {
        // Obtener todos los módulos de todos los usuarios
        $modulos = Modulo::all();

        // Devolver los módulos como JSON
        return response()->json(['modulos' => $modulos]);

        // Convertir los módulos a una cadena HTML
        $htmlContent = '<html><head><title>Jefe de Estudios</title></head><body>';
        
        // Añadir contenido HTML basado en los módulos
        foreach ($modulos as $modulo) {
            $htmlContent .= '<div>' . $modulo->nombre . '</div>';
            // Puedes ajustar esta lógica según la estructura de tus módulos
        }

        $htmlContent .= '</body></html>';

        // Especificar la ubicación del archivo HTML en la carpeta public
        $filePath = public_path('jefeDeEstudio.html');

        // Escribir el contenido HTML en el archivo
        File::put($filePath, $htmlContent);

        // Puedes agregar lógica adicional aquí según tus necesidades

        // Redirigir al usuario a la ubicación del archivo HTML generado
        return redirect('jefeDeEstudio.html');
    }
}
