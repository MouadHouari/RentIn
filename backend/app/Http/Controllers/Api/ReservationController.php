<?php

namespace App\Http\Controllers\Api;

use App\Models\Offre;
use App\Models\Voiture;
use App\Models\Reservation;
use Illuminate\Http\Request;
use function PHPSTORM_META\map;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
   
    public function index ($id_agence,$id_client){
        if($id_agence==0){
            $reservations = DB::table('reservations')
              ->join('offres', 'reservations.offre_id', '=', 'offres.id')
              ->join('voitures', 'reservations.voiture_id', '=', 'voitures.id')
              ->join('users', 'reservations.client_id', '=', 'users.id')
              ->select('reservations.*',
              'voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', 
              )
              ->where('users.id', '=', $id_client)
              ->get();
        }
        else{
            
            $reservations = DB::table('reservations')
            ->join('offres', 'reservations.offre_id', '=', 'offres.id')
            ->join('voitures', 'reservations.voiture_id', '=', 'voitures.id')
            ->join('users', 'reservations.agence_id', '=', 'users.id')
            ->select('reservations.*',
            'voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', 
            )
            ->where('users.id', '=', $id_agence)
            ->get();
        }
       if($reservations->count() > 0){
        
            return response()->json([
            'status' => '200' ,
            'reservations' => $reservations

             ], 200);}
        else{
            return response()->json([
            'status' => 404 ,
            'message' => 'No record found'

            ], 404);
         }
       
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'voiture_id' => 'required|exists:voitures,id',
            'agence_id' => 'required|exists:users,id',
            'client_id' => 'required|exists:users,id',
            'nom'=> 'required',
            'prenom'=> 'required',
            'email'=> 'required',
            'tel'=> 'required|max:10',
            'personnes'=> 'required',
            'bagages'=> 'required',
            'dateDebut'=> 'required',
            'dateRetour'=> 'required',
            'totale' => 'required',
            'etat' => 'required|max:15',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422 ,
                'errors' => $validator->messages()
    
            ], 422);
        }else{
            $reservation = Reservation::create([
                'offre_id' => $request->offre_id,
                'voiture_id' => $request->voiture_id,
                'agence_id' => $request->agence_id,
                'client_id' => $request->client_id,
                'nom'=> $request->nom,
                'prenom'=> $request->prenom,
                'email'=> $request->email,
                'tel'=> $request->tel,
                'personnes'=> $request->personnes,
                'bagages'=> $request->bagages,
                'dateDebut'=> $request->dateDebut,
                'dateRetour'=> $request->dateRetour,
                'message' => $request->message,
                'totale' => $request->totale,
                'etat' => $request->etat,
                
            ]);

            if($reservation){

                return response()->json([
                    'status' => 200,
                    'message' => 'Réservation est bien ajoutée!!'
                ],200);
            }else{

                return response()->json([
                    'status' => 500,
                    'message' => 'Erreur Réservation non ajoutée!!'
                ],500);
            }
        }

    }

    public function show($id_agence,$id){
        if($id_agence==0){
            
        $reservation = DB::table('reservations')
          ->join('voitures', 'reservations.voiture_id', '=', 'voitures.id')
          ->join('users', 'reservations.agence_id', '=', 'users.id')
          ->select('reservations.*', 'voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', )
          ->where('reservations.id', '=', $id)
          ->get(); 
    }
    else{

        $reservation = DB::table('reservations')
        ->join('voitures', 'reservations.voiture_id', '=', 'voitures.id')
        ->join('users', 'reservations.agence_id', '=', 'users.id')
        ->select('reservations.*', 'voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', )
        ->where('users.id', '=', $id_agence)
        ->where('reservations.id', '=', $id)
        ->get();}

        if($reservation->count() != 0){
             
            return response()->json([
                'status' => 200,
                'reservation' => $reservation,
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Réservation est non trouvée!!'
            ],404);
        }
    }


    public function edit($id_agence,$id){

        $reservation = Reservation::find($id);
        if($reservation->count() != 0){
            if($reservation->agence_id==$id_agence){ 
                return response()->json([
                    'status' => 200,
                    'reservation' => $reservation
                ],200);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => "vous n'avez pas d'accés !!"
                ],404);
            }
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Réservation est non trouvée!!'
            ],404);
        }

    } 

    public function update(Request $request, int $id_agence, int $id){

        
        $validator = Validator::make($request->all(), [
           
            'etat' => 'required|max:15',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422 ,
                'errors' => $validator->messages()
    
            ], 422);
        }else{

            $reservation = Reservation::find($id);

            if($reservation){
                if($reservation->agence_id==$id_agence){
                    $reservation -> update([
                        'etat' => $request->etat,
                    ]);

                    return response()->json([
                        'status' => 200,
                        'message' => 'etat Bien Modifiée!!'
                    ],200);
                }else{
                    return response()->json([
                        'status' => 404,
                        'message' => "vous n'avez pas d'accés !!"
                    ],404);
                }

            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'Demande non trouvée!!'
                ],404);
            }
        }
    }


    public function destroy($id_agence,$id)
    {
        $reservation = Reservation::find($id);
        if($reservation){
            if($reservation->agence_id==$id_agence){
                
                $reservation -> delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Réservation Bien Supprimée!!'
                ],200);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => "vous n'avez pas d'accés !!"
                ],404);
            }

        }else{

            return response()->json([
                'status' => 404,
                'message' => 'Réservation non trouvée!!'
            ],404);

        }

    }

 }