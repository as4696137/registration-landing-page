<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubmissionRequest;
use App\Http\Resources\SubmissionResource;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;

class SubmissionController extends Controller
{
    public function store(StoreSubmissionRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $registration = Registration::query()
            ->where('registration_code', $validated['registration_code'])
            ->firstOrFail();

        $filePath = null;
        $originalName = null;

        if ($request->hasFile('work_file')) {
            $file = $request->file('work_file');
            $filePath = $file->store(config('contest.submission_file.directory'), config('contest.submission_file.disk'));
            $originalName = $file->getClientOriginalName();
        }

        $existingSubmission = $registration->submission;

        $submission = $registration->submission()->updateOrCreate(
            ['registration_id' => $registration->id],
            [
                'work_title' => $validated['work_title'],
                'work_summary' => $validated['work_summary'],
                'strategy_statement' => $validated['strategy_statement'] ?? null,
                'file_path' => $filePath ?? $existingSubmission?->file_path,
                'file_original_name' => $originalName ?? $existingSubmission?->file_original_name,
                'status' => 'submitted',
                'submitted_at' => now(),
            ],
        );

        $registration->update(['status' => 'submitted']);

        return (new SubmissionResource($submission))
            ->response()
            ->setStatusCode(201);
    }
}
