<?php
use Illuminate\Support\Facades\Route;
use App\Models\Tour;

Route::get('/tours', function () {
    $tours = Tour::all();
    return view('tours', ['tours' => $tours]);
});
