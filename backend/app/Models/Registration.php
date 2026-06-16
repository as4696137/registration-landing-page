<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Registration extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'registration_code',
        'team_name',
        'award_key',
        'contact_name',
        'contact_email',
        'contact_phone',
        'members',
        'status',
    ];

    protected $casts = [
        'members' => 'array',
    ];

    public function submission(): HasOne
    {
        return $this->hasOne(Submission::class);
    }
}
