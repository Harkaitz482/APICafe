<?php

namespace Database\Factories;

use App\Models\Aula;
use Illuminate\Database\Eloquent\Factories\Factory;

class AulaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Aula::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'numero' => $this->faker->unique()->numberBetween(1, 100),
            'disponibilidad' => $this->faker->randomElement(['available', 'occupied']),
            'horasTarde' => $this->faker->numberBetween(5, 10),
            'horasMañana' => $this->faker->numberBetween(5, 10),

            // Add other columns and their respective definitions as needed
        ];
    }
}
