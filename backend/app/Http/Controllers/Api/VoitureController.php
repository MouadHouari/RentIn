<?php

namespace App\Http\Controllers\Api;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VoitureController extends Controller
{
    public function index ($id_agence){
        $voitures = DB::table('voitures')
        ->join('users', 'voitures.agence_id', '=', 'users.id')
        ->where('users.id', '=', $id_agence)
        ->select('voitures.*')
        ->get();
       if($voitures->count() > 0){
            return response()->json([
            'status' => '200' ,
            'voitures' => $voitures
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
            'imei' => 'required|max:9',
            'modele' => 'required|max:191',
            'marque' => 'required|max:191',
            // 'photo1' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            // 'photo2' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'boitedevitesse' => 'required|max:20',
            'annee' => 'required|max:191',
            'carburant' => 'required|max:191',
            'portes' => 'required|max:9',
            'agence_id' => 'required|exists:users,id',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422 ,
                'errors' => $validator->messages()
    
            ], 422);
        }else{
            $filename1=$filename2="";
            if($request->hasFile('photo1')){
                    $file1 = $request->file('photo1');
                    $extension1 = $file1->getClientOriginalExtension();
                    $filename1= time().'.'.$extension1;
                    $file1->move('uploads/voitures/'.$filename1);
            }
            if($request->hasFile('photo2')){
                    $file2 = $request->file('photo2');
                    $extension2 = $file2->getClientOriginalExtension();
                    $filename2= time().'.'.$extension2;
                    $file2->move('uploads/voitures/'.$filename2);
            }
            $voiture = Voiture::create([
                'imei' => $request->imei,
                'modele' => $request->modele,
                'marque' => $request->marque,
                'annee' => $request->annee,
                'boitedevitesse' => $request->boitedevitesse,
                'carburant' => $request->carburant,
                'portes' => $request->portes,
                'agence_id' => $request->agence_id,
                'photo1' => 'uploads/voitures/'.$filename1,
                'photo2' => 'uploads/voitures/'.$filename2,
                
            ]);

            if($voiture){

                return response()->json([
                    'status' => 200,
                    'message' => 'Voiture est bien ajoutée!!'
                ],200);
            }else{

                return response()->json([
                    'status' => 500,
                    'message' => 'Erreur Voiture Non ajoutée!!'
                ],500);
            }
        }

    }

    public function show($id){
        $voiture = Voiture::find($id);
        if($voiture){
             
            return response()->json([
                'status' => 200,
                'voiture' => $voiture
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Voiture est non trouvée!!'
            ],404);
        }
    }


    public function edit($id){
        $voiture = Voiture::find($id);
        if($voiture){
             
            return response()->json([
                'status' => 200,
                'voiture' => $voiture
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Voiture est non trouvée!!'
            ],404);
        }

    } 

    public function update(Request $request, int $id){

        
        $validator = Validator::make($request->all(), [
            'imei' => 'required|max:9',
            'modele' => 'required|max:191',
            'marque' => 'required|max:191',
            // 'photo1' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            // 'photo2' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'boitedevitesse' => 'required|max:20',
            'annee' => 'required|max:191',
            'carburant' => 'required|max:191',
            'portes' => 'required|max:9',
            'agence_id' => 'required|exists:users,id',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422 ,
                'errors' => $validator->messages()
    
            ], 422);
        }else{

            $voiture = Voiture::find($id);


            if($voiture){
                $filename1=$filename2="";
            if($request->hasFile('photo1')){
                    $file1 = $request->file('photo1');
                    $extension1 = $file1->getClientOriginalExtension();
                    $filename1= time().'.'.$extension1;
                    $file1->move('uploads/voitures/'.$filename1);
            }
            if($request->hasFile('photo2')){
                    $file2 = $request->file('photo2');
                    $extension2 = $file2->getClientOriginalExtension();
                    $filename2= time().'.'.$extension2;
                    $file2->move('uploads/voitures/'.$filename2);
            }
                $voiture -> update([
                    'imei' => $request->imei,
                    'modele' => $request->modele,
                    'marque' => $request->marque,
                    'annee' => $request->annee,
                    'boitedevitesse' => $request->boitedevitesse,
                    'carburant' => $request->carburant,
                    'portes' => $request->portes,
                    'agence_id' => $request->agence_id,
                    'photo1' => 'uploads/voitures/'.$filename1,
                    'photo2' => 'uploads/voitures/'.$filename2,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Voiture Bien Modifiée!!'
                ],200);
            }else{

                return response()->json([
                    'status' => 404,
                    'message' => 'Voiture non trouvée!!'
                ],404);
            }
        }
    }


    public function destroy($id)
    {
        $voiture = Voiture::find($id);
        if($voiture){

            $voiture -> delete();
            return response()->json([
                'status' => 200,
                'message' => 'Voiture Bien Supprimée!!'
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => 'Voiture non trouvée!!'
            ],404);

        }

    }

 }