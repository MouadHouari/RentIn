<?php

namespace App\Http\Controllers\Api;

use App\Models\Offre;
use App\Models\Voiture;
use Illuminate\Http\Request;
use function PHPSTORM_META\map;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class OffreController extends Controller
{
    
    public function index ($id_agence){
        if($id_agence==0){
            
            $offres = DB::table('offres')
              ->join('voitures', 'offres.voiture_id', '=', 'voitures.id')
              ->join('users', 'offres.agence_id', '=', 'users.id')
              ->select('offres.*', 'users.agence_name','voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', )
              ->get();
        }
        else{
            
              $offres = DB::table('offres')
              ->join('voitures', 'offres.voiture_id', '=', 'voitures.id')
              ->join('users', 'offres.agence_id', '=', 'users.id')
              ->select('offres.*', 'voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', )
              ->where('users.id', '=', $id_agence)
              ->get();
        }
       if($offres->count() > 0){
        
            return response()->json([
            'status' => '200' ,
            'offres' => $offres

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
            'agence_id' => 'required|exists:users,id',
            'voiture_id' => 'required|exists:voitures,id',
            'ville' => 'required|max:30',
            'prix' => 'required',
            'description' => 'required',
            'etat' => 'required|max:15',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422 ,
                'errors' => $validator->messages()
    
            ], 422);
        }else{
            $offre = Offre::create([
                'agence_id'=> $request->agence_id,
                'voiture_id'=> $request->voiture_id,
                'ville' =>  $request->ville,
                'prix' =>  $request->prix,
                'description' => $request->description,
                'etat' => $request->etat,
            ]);

            if($offre){

                return response()->json([
                    'status' => 200,
                    'message' => 'Offre est bien ajoutée!!'
                ],200);
            }else{

                return response()->json([
                    'status' => 500,
                    'message' => 'Erreur Offre Non ajoutée!!'
                ],500);
            }
        }

    }

    public function show($id_agence,$id){
        
        if($id_agence==0){
         
        $offre = DB::table('offres')
          ->join('voitures', 'offres.voiture_id', '=', 'voitures.id')
          ->join('users', 'offres.agence_id', '=', 'users.id')
          ->select('offres.*','users.agence_name', 'voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', )
          ->where('offres.id', '=', $id)
          ->get(); 
    }
    else{

        $offre = DB::table('offres')
        ->join('voitures', 'offres.voiture_id', '=', 'voitures.id')
        ->join('users', 'offres.agence_id', '=', 'users.id')
        ->select('offres.*', 'voitures.imei','voitures.modele', 'voitures.marque', 'voitures.photo1', 'voitures.photo2', 'voitures.boitedevitesse', 'voitures.annee', 'voitures.carburant','voitures.portes', )
        ->where('users.id', '=', $id_agence)
        ->where('offres.id', '=', $id)
        ->get();}

        if($offre->count() != 0){
             
            return response()->json([
                'status' => 200,
                'offre' => $offre,
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Offre est non trouvée!!'
            ],404);
        }
    }


    public function edit($id_agence,$id){

        $offre = Offre::find($id);
        if($offre->count() != 0){
            if($offre->agence_id==$id_agence){ 
                return response()->json([
                    'status' => 200,
                    'offre' => $offre
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
                'message' => 'Offre est non trouvée!!'
            ],404);
        }

    } 

    public function update(Request $request, int $id_agence, int $id){

        
        $validator = Validator::make($request->all(), [
            'voiture_id' => 'required|exists:voitures,id',
            'ville' => 'required|max:30',
            'prix' => 'required',
            'description' => 'required',
            'etat' => 'required|max:15',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422 ,
                'errors' => $validator->messages()
    
            ], 422);
        }else{

            $offre = Offre::find($id);

            if($offre){
                if($offre->agence_id==$id_agence){
                    $offre -> update([
                       'voiture_id'=> $request->voiture_id,
                        'ville' =>  $request->ville,
                        'prix' =>  $request->prix,
                        'description' => $request->description,
                        'etat' => $request->etat,
                    ]);

                    return response()->json([
                        'status' => 200,
                        'message' => 'Offre Bien Modifiée!!'
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
                    'message' => 'Offre non trouvée!!'
                ],404);
            }
        }
    }


    public function destroy($id_agence,$id)
    {
        $offre = Offre::find($id);
        if($offre){
            if($offre->agence_id==$id_agence){
                
                $offre -> delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Offre Bien Supprimée!!'
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
                'message' => 'Offre non trouvée!!'
            ],404);

        }

    }

 }