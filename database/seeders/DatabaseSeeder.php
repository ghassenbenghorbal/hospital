<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Co2;
use App\Models\Humidity;
use App\Models\Movement;
use App\Models\Temperature;
use App\Models\Block;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // Employee::factory(50)->create();
        // Block::factory(5)->create();
        Co2::factory(200)->create();
        Humidity::factory(200)->create();
        Movement::factory(200)->create();
        Temperature::factory(200)->create();
    }
}
