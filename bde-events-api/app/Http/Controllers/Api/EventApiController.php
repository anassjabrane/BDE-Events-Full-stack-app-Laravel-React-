<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;

class EventApiController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return response()->json($events);
    }
}
