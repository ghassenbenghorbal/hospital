<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


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
        $request->validate([
            'token_name' => 'required'
        ]);
        $token = $request->user()->createToken($request->token_name);
        return ['token' => $token->plainTextToken];
    }

    public function changeProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);
        $user = Auth::user();
        $user->name = $request->name;
        $user->email = $request->email;
        Auth::login($user);
        return back()->with('success', "Profile changed successfully!");
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|min:8',
        ]);
        $user = Auth::user();

        if(!Hash::check($request->currentPassword, $user->password)) // if current password is incorrect
        return back()->with('error', 'Current password incorrect')->with('form','1');
        
        if(Hash::check($request->newPassword, $user->password)) // if new password is the same as the current password
        return back()->with('error', 'New password must be different from current password')->with('form','1');
        
        $user->password = Hash::make($request->newPassword);
        $user->save();
        return back()->with('success', "Password changed successfully!");
    }
}
