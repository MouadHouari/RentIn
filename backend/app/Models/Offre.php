<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    use HasFactory;

    protected $table = 'offres'    
    ;

    protected $fillable =[
        'voiture_id',
        'ville',
        'prix',
        'description',
        'etat',
        'agence_id',
    ];

    
    public function voiture(){
        return $this->hasOne(Voiture::class);
    }

    public function agence(){
    return $this->hasOne(User::class);
    }
}
