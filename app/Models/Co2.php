<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Co2 extends Model
{
    use HasFactory;

    protected $fillable = [
        'block_id',
        'quantity',
        'created_at'
    ];
}
