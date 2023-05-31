<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservations'    
    ;

    protected $fillable =[
        // 'voiture_id',
        // 'agence_id',
        'offre_id',
        'voiture_id',
        'agence_id',
        'client_id',
        'nom',
        'prenom',
        'email',
        'tel',
        'personnes',
        'bagages',
        'dateDebut',
        'dateRetour',
        'message',
        'totale',
        'etat',
    ];
    
    
    public function voiture(){
        return $this->hasOne(Voiture::class);
    }

    public function agence(){
    return $this->hasOne(User::class);
    }
}
