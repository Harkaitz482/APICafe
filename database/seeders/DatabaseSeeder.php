<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Aula;
use App\Models\Curso;
use App\Models\Departamento;
use App\Models\Especialidad;
use App\Models\Modulo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // DB::delete('delete from apicafe');
        Aula::factory()->count(5)->create();
        Curso::factory()->count(5)->create();
        User::factory()->count(5)->create();
        Departamento::factory()->count(5)->create();
        Especialidad::factory()->count(5)->create();
        Modulo::factory()->count(5)->create();


    }
}
