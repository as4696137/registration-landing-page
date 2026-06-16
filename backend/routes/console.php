<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('about:contest', function (): void {
    $this->info(config('contest.name'));
})->purpose('Show contest backend information');
