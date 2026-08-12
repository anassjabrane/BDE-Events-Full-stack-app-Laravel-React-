<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Event;
use Illuminate\Http\Request;

class BookingApiController extends Controller
{
   public function store(Request $request, Event $event)
{
    $bookingsCount = Booking::where('event_id', $event->id)->count();

    if ($bookingsCount >= $event->max_capacity) {
        return response()->json([
            'message' => 'Event is full'
        ], 400);
    }

    $alreadyBooked = Booking::where('user_id', $request->user_id)
        ->where('event_id', $event->id)
        ->exists();

    if ($alreadyBooked) {
        return response()->json([
            'message' => 'Student already booked this event'
        ], 400);
    }

    $booking = Booking::create([
        'user_id' => $request->user_id,
        'event_id' => $event->id,
    ]);

    return response()->json([
        'message' => 'Booking created successfully',
        'booking' => $booking
    ], 201);
}
}
