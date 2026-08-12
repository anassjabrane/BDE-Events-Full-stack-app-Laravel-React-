<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventApiController;
use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\TicketApiController;
use App\Http\Controllers\Api\AuthApiController;

Route::get('/events', [EventApiController::class, 'index']);

Route::post('/events', [EventApiController::class, 'store']);

Route::put('/events/{event}', [EventApiController::class, 'update']);

Route::delete('/events/{event}', [EventApiController::class, 'destroy']);

Route::post('/login', [AuthApiController::class, 'login'])
    ->name('login');

Route::middleware('auth:sanctum')->post(
    '/events/{event}/book',
    [BookingApiController::class, 'store']
);

Route::middleware('auth:sanctum')->get(
    '/user/tickets',
    [TicketApiController::class, 'index']
);
