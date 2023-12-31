<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AulaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'numero'=> 'required|string|max:255',
           'disponibilidad'=> 'required|string|max:255',
           'horasTarde'=>'required|integer|max:255',
           'horasMañana'=>'required|integer|max:255'

        ];
    }
}
