<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
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

        collect([
            [
                "name" => "Rachel Ardana Putra Ginting",
                "username" => "rachelginting",
                "email" => "rachelardanaputraginting@gmail.com",
                "password" => bcrypt("password"),

            ],
            [
                "name" => "Dinda Fitra Indriana",
                "username" => "dindaindrina",
                "email" => "dindaindriana@gmail.com",
                "password" => bcrypt("password"),

            ],
        ])->each(fn($user) => User::create($user));

        User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
