<?php

return [
    'name' => '初聲新聞獎',
    'registration_period' => [
        'starts_at' => env('CONTEST_REGISTRATION_START', '2022-03-01'),
        'ends_at' => env('CONTEST_REGISTRATION_END', '2022-05-25'),
    ],
    'submission_period' => [
        'starts_at' => env('CONTEST_SUBMISSION_START', '2022-03-01'),
        'ends_at' => env('CONTEST_SUBMISSION_END', '2022-07-10'),
    ],
    'team_size' => [
        'min' => 1,
        'max' => 6,
    ],
    'awards' => [
        [
            'key' => 'audience_insight',
            'name' => '最佳新聞受眾洞察獎',
            'prompt' => '新聞要對誰說話？',
        ],
        [
            'key' => 'strategy_creativity',
            'name' => '最佳新聞策略創意獎',
            'prompt' => '新聞怎麼說話？',
        ],
        [
            'key' => 'experience_innovation',
            'name' => '最佳新聞體驗創新獎',
            'prompt' => '新聞用什麼說話？',
        ],
    ],
    'submission_file' => [
        'disk' => env('FILESYSTEM_DISK', 'public'),
        'directory' => 'submissions',
        'max_kilobytes' => 20480,
        'mimes' => ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'zip'],
    ],
];
