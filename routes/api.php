<?php

use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Charts\Co2Controller;
use App\Http\Controllers\Charts\HumidityController;
use App\Http\Controllers\Charts\TemperatureController;
use App\Http\Controllers\Charts\MovementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HospitalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('v1')->group(function () {
    Route::get('employee', [EmployeeController::class, 'index']);
});
Route::middleware('auth.basic')->post('generate-token', [UserController::class, 'generateApiToken']);
Route::middleware('auth:sanctum')->prefix('health')->group(function() {
    Route::resource('co2', Co2Controller::class)->only(['index', 'store']);
    Route::resource('humidity', HumidityController::class)->only(['index', 'store']);
    Route::resource('temperature', TemperatureController::class)->only(['index', 'store']);
    Route::resource('movement', MovementController::class)->only(['index', 'store']);
    Route::get('blocks', [HospitalController::class, 'index']);
});
