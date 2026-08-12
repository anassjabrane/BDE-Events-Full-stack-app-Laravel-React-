<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketApiController extends Controller
{
    public function index(Request $request)
    {
        $tickets = Ticket::with([
            'booking.user',
            'booking.event'
        ])
        ->whereHas('booking', function ($query) use ($request) {
            $query->where('user_id', $request->user_id);
        })
        ->get();

        return response()->json($tickets);
    }
}
