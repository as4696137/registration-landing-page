<?php

use App\Http\Controllers\Api\ContestController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\SubmissionController;
use Illuminate\Support\Facades\Route;

Route::get('/contest', [ContestController::class, 'show']);

Route::post('/registrations', [RegistrationController::class, 'store']);
Route::get('/registrations/{registrationCode}', [RegistrationController::class, 'show']);

Route::post('/submissions', [SubmissionController::class, 'store']);
