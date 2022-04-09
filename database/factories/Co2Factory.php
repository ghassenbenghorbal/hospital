<?php

namespace Database\Factories;

use App\Models\Co2;
use Illuminate\Database\Eloquent\Factories\Factory;

class Co2Factory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Co2::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "block_id" => random_int(1,5),
            "quantity" => random_int(400,5000),
            "created_at" => time() + random_int(-300000,100000)
        ];
    }
}
