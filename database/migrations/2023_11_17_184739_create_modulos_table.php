<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('modulos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->string('nombre');
            $table->integer('horas_semanales');
            $table->integer('horas_totales');
            $table->foreignId('user_id')->constrained();
            // $table->foreignId('especialidad_id')->constrained();
            // $table->foreignId('curso_id')->constrained();
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modulos');
    }
};
