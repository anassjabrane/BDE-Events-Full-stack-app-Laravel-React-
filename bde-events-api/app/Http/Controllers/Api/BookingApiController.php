<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Event;
use Illuminate\Http\Request;

class BookingApiController extends Controller
{
    public function store(Request $request)
    {
        $event = Event::find($request->event_id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
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
