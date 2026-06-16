<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $awardKeys = collect(config('contest.awards'))->pluck('key')->all();
        $maxMembers = config('contest.team_size.max', 6);

        return [
            'team_name' => ['required', 'string', 'max:120'],
            'award_key' => ['required', 'string', Rule::in($awardKeys)],
            'contact_name' => ['required', 'string', 'max:80'],
            'contact_email' => ['required', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:40'],
            'members' => ['required', 'array', 'min:1', 'max:'.$maxMembers],
            'members.*.name' => ['required', 'string', 'max:80'],
            'members.*.email' => ['nullable', 'email', 'max:255'],
            'members.*.age' => ['required', 'integer', 'min:1', 'max:27'],
            'members.*.role' => ['nullable', 'string', 'max:80'],
            'members.*.school_or_company' => ['nullable', 'string', 'max:120'],
        ];
    }

    public function attributes(): array
    {
        return [
            'team_name' => '團隊名稱',
            'award_key' => '參賽獎項',
            'contact_name' => '聯絡人姓名',
            'contact_email' => '聯絡信箱',
            'members' => '團隊成員',
            'members.*.age' => '成員年齡',
        ];
    }
}
