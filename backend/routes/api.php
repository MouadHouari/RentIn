<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\Api\VoitureController;
use App\Http\Controllers\Api\OffreController;
use App\Http\Controllers\Api\ReservationController;


/** ---------Register and Login ----------- */


Route::post('register',[RegisterController::class, 'register']);
Route::post('login',[RegisterController::class, 'login']);
Route::get('user/{id}', [RegisterController::class, 'show']);
Route::put('user/{id}/edit',[RegisterController::class, 'update']);

/** -----------Users --------------------- */

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout',[RegisterController::class, 'logout']);

});

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/users',[RegisterController::class,'index'])->name('index');
});

Route::middleware('auth:sanctum')->controller(RegisterController::class)->group(function() {
    Route::get('/users','index')->name('index');
});

//---------Routes des voitures------------------------------//

Route::get('voitures/{id_agence}', [VoitureController::class, 'index']);
Route::post('voitures', [VoitureController::class, 'store']);
Route::get('voitures/{id}', [VoitureController::class, 'show']);
Route::get('voitures/{id}/edit', [VoitureController::class, 'edit']);
Route::put('voitures/{id}/edit', [VoitureController::class, 'update']);
Route::delete('voitures/{id}/delete', [VoitureController::class, 'destroy']);

//---------Routes des offres------------------------------//

Route::get('offres/{id}', [OffreController::class, 'index']);
Route::post('offres', [OffreController::class, 'store']);
Route::get('offres/{id_agence}/{id}', [OffreController::class, 'show']);
Route::get('offres/{id_agence}/{id}/edit', [OffreController::class, 'edit']);
Route::put('offres/{id_agence}/{id}/edit', [OffreController::class, 'update']);
Route::delete('offres/{id_agence}/{id}/delete', [OffreController::class, 'destroy']);

//---------Routes des reservations------------------------------//

Route::get('reservations/{id_agence}/{id_client}', [ReservationController::class, 'index']);
Route::post('reservations', [ReservationController::class, 'store']);
Route::get('reservations/{id_agence}/{id}/edit', [ReservationController::class, 'edit']);
Route::put('reservations/{id_agence}/{id}/edit', [ReservationController::class, 'update']);
// Route::delete('offres/{id_agence}/{id}/delete', [OffreController::class, 'destroy']);

