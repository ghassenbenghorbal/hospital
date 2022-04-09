<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Block;
use App\Http\Resources\BlockResource;

class HospitalController extends Controller
{
    public function index()
    {
        $blocks = Block::select("id","name")->get();
        return BlockResource::collection($blocks);
    }
}
