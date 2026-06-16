<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('registration_code')->unique();
            $table->string('team_name');
            $table->string('award_key');
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('contact_phone')->nullable();
            $table->json('members');
            $table->string('status')->default('registered');
            $table->timestamps();

            $table->index(['award_key', 'status']);
            $table->index('contact_email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
