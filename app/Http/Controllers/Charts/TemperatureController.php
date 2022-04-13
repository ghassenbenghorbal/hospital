<?php

namespace App\Http\Controllers\Charts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Temperature;
use App\Http\Resources\TemperatureResource;

class TemperatureController extends Controller
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
        $temperature = Temperature::select('temp','created_at')->where("block_id","=",$block_id)->whereDate('created_at','=',$request->date)->orderBy('created_at')->get();
        return TemperatureResource::collection($temperature);
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
            'block_id' => 'required|max:8',
            'temp' => 'required|digits_between:1,3',
        ]);
        $temperature = Temperature::create([
            "block_id" => $request->block_id,
            "temp" => $request->temp
        ]);
        $temperature->save();
        return $temperature;

    }

}
