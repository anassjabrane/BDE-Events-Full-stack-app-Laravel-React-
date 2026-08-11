<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'location',
        'price',
        'max_capacity',
    ];
    public function bookings(): HasMany
{
    return $this->hasMany(Booking::class);
}
}
