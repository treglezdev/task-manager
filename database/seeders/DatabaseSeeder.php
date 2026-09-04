<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'alex@mail.com'],
            ['name' => 'Alex']
        );

        $user->tokens()->delete();
        $token = $user->createToken('tester')->plainTextToken; 

        $this->command->newLine();
        $this->command->info("Token de user {$user->email}: {$token}");
        $this->command->newLine();
    }
}
