<?php

namespace App\Http\Controllers\Charts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movement;
use App\Http\Resources\MovementResource;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class MovementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $block_id = null;
        if($request->has("block_id"))
            $block_id = $request->block_id;
        else
            $block_id = 1;
        $movement = Movement::selectRaw('count(id) as people, DATE_FORMAT(created_at,"%H") as hour')->where("block_id","=",$block_id)->whereDate('created_at','=', Carbon::create($request->date)->toDateString())->groupBy('hour')->orderBy('hour')->get();
        return MovementResource::collection($movement);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'block' => 'required|max:8',
        ]);
        $movement = Movement::create([
            "block_id" => $request->block_id,
        ]);
        $movement->save();
        return $movement;

    }

}
