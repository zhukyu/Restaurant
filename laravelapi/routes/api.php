<?php

use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('restaurants', [RestaurantController::class, 'index']);
Route::post('/add-restaurant', [RestaurantController::class, 'store']);
Route::get('/edit-restaurant/{id}', [RestaurantController::class, 'edit']);
Route::put('/update-restaurant/{id}', [RestaurantController::class, 'update']);
Route::delete('delete-restaurant/{id}', [RestaurantController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);
});
 
/* Api Register */
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return Response()->json(array("token"=>$token));
});
Route::post('/users/login', [App\Http\Controllers\API\UsersController::class, 'onLogin'])->name('user.login');
Route::post('/users', [App\Http\Controllers\API\UsersController::class, 'onRegister'])->name('user.register');
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
