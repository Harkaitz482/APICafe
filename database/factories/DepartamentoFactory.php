<?php

namespace Database\Factories;

use App\Models\Departamento;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartamentoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Departamento::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->word,
            'puesto' => $this->faker->randomElement(['Jefe de departamento', 'Profesor']),
            // Add other columns and their respective definitions as needed
        ];
    }
}
