<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegistrationRequest;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class RegistrationController extends Controller
{
    public function store(StoreRegistrationRequest $request): JsonResponse
    {
        $registration = Registration::create([
            ...$request->validated(),
            'registration_code' => $this->makeRegistrationCode(),
            'status' => 'registered',
        ]);

        return (new RegistrationResource($registration))
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $registrationCode): RegistrationResource
    {
        $registration = Registration::query()
            ->where('registration_code', Str::upper($registrationCode))
            ->with('submission')
            ->firstOrFail();

        return new RegistrationResource($registration);
    }

    private function makeRegistrationCode(): string
    {
        do {
            $code = 'FSN-'.now()->format('ymd').'-'.Str::upper(Str::random(6));
        } while (Registration::query()->where('registration_code', $code)->exists());

        return $code;
    }
}
