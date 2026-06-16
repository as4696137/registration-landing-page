<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SubmissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'registration_id' => $this->registration_id,
            'work_title' => $this->work_title,
            'work_summary' => $this->work_summary,
            'strategy_statement' => $this->strategy_statement,
            'file_original_name' => $this->file_original_name,
            'file_url' => $this->file_path ? Storage::disk(config('contest.submission_file.disk'))->url($this->file_path) : null,
            'status' => $this->status,
            'submitted_at' => $this->submitted_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
