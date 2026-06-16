<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubmissionRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if ($this->filled('registration_code')) {
            $this->merge([
                'registration_code' => str($this->input('registration_code'))->upper()->toString(),
            ]);
        }
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $fileConfig = config('contest.submission_file');
        $mimes = implode(',', $fileConfig['mimes']);

        return [
            'registration_code' => ['required', 'string', 'exists:registrations,registration_code'],
            'work_title' => ['required', 'string', 'max:160'],
            'work_summary' => ['required', 'string', 'max:3000'],
            'strategy_statement' => ['nullable', 'string', 'max:8000'],
            'work_file' => [
                'nullable',
                'file',
                'mimes:'.$mimes,
                'max:'.$fileConfig['max_kilobytes'],
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'registration_code' => '報名編號',
            'work_title' => '作品名稱',
            'work_summary' => '作品摘要',
            'strategy_statement' => '策略單內容',
            'work_file' => '作品檔案',
        ];
    }
}
