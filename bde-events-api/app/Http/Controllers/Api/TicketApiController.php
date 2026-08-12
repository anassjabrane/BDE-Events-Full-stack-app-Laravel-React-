<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketApiController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $tickets = Ticket::with([
            'booking.user',
            'booking.event'
        ])
        ->whereHas('booking', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->get();

        return response()->json($tickets);
    }
}
