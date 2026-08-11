<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventApiController;

Route::get('/events', [EventApiController::class, 'index']);
Route::post('/events', [EventApiController::class, 'store']);
Route::put('/events/{event}', [EventApiController::class, 'update']);
Route::delete('/events/{event}', [EventApiController::class, 'destroy']);
