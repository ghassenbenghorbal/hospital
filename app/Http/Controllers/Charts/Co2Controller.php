<?php

namespace App\Http\Controllers\Charts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Co2;
use App\Http\Resources\Co2Resource;

class Co2Controller extends Controller
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
        $co2 = Co2::select('quantity','created_at')->where("block_id","=",$block_id)->whereDate('created_at','=',$request->date)->orderBy('created_at')->get();
        return Co2Resource::collection($co2);
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
            'quantity' => 'required|digits_between:1,5',
        ]);
        $co2 = Co2::create([
            "block_id" => $request->block_id,
            "quantity" => $request->quantity
        ]);
        $co2->save();
        return $co2;

    }

}
