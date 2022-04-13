<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('profile');
    }

    public function generateApiToken(Request $request)
    {   
        $token = $request->user()->createToken($request->token_name);
        return ['token' => $token->plainTextToken];
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        if (!(Hash::check($request->get('current-password'), Auth::user()->password))) {
            // The passwords matches
        }
        if(strcmp($request->get('current-password'), $request->get('new-password')) == 0){
            // Current password and new password same
        }
        
        $user = $request->user();
        $user->password = Hash::make();
        
    }
}
