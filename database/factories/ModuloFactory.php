<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Modulo;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Modulo>
 */
class ModuloFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'codigo' => $this->faker->unique()->word,
            'nombre' => $this->faker->sentence,
            'horas_semanales' => $this->faker->numberBetween(1, 20),
            'horas_totales' => $this->faker->numberBetween(20, 100),
            'user_id' => \App\Models\User::factory(),
            'especialidad_id' => \App\Models\Especialidad::factory(),
            'curso_id' => \App\Models\Curso::factory(),
            // 'aula_id' => \App\Models\Aula::factory(),
        ];
    }
}
