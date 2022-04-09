<?php

namespace Database\Factories;

use App\Models\Humidity;
use Illuminate\Database\Eloquent\Factories\Factory;

class HumidityFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Humidity::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "block_id" => random_int(1,5),
            "percentage" => random_int(0,100),
            "created_at" => time() + random_int(-300000,100000)
        ];
    }
}
