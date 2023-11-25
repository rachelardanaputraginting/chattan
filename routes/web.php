<?php

use App\Events\MessageSent;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function() {
    Route::get('/', HomeController::class);
    Route::get('/chat/{user:username}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{user:username}', [ChatController::class, 'store'])->name('chat.store');
});

require __DIR__.'/auth.php';
