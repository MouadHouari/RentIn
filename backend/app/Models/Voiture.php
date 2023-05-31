<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;

    protected $table = 'voitures';

    protected $fillable =[
        'imei',
        'modele',
        'marque',
        'photo1',
        'photo2',
        'annee',
        'boitedevitesse',
        'carburant',
        'portes',
        'agence_id'
    ];

}
