<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'registration_code' => $this->registration_code,
            'team_name' => $this->team_name,
            'award_key' => $this->award_key,
            'contact_name' => $this->contact_name,
            'contact_email' => $this->contact_email,
            'contact_phone' => $this->contact_phone,
            'members' => $this->members,
            'status' => $this->status,
            'created_at' => $this->created_at?->toISOString(),
            'submission' => new SubmissionResource($this->whenLoaded('submission')),
        ];
    }
}
