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
            'photo1' => 'required',
            'photo2' => 'required',
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
            if($request->input('photo1')){
                $file = $request->input('photo1');
                  $filename = time().rand(). '.png';
                  $userFile = $request->input('imei');
                  $uploadsPath = public_path('uploads/voitures');
                  $publicPath = $uploadsPath . '/'. $userFile . '/' . $filename;
                $exactpath = '/uploads/voitures/'.$userFile . '/' . $filename;
                if (!file_exists(dirname($publicPath))) {
                        mkdir(dirname($publicPath), 0755, true);
                }
                if(file_put_contents($publicPath, file_get_contents($file))){
                    $response["success"] = true;
                    $response["path"] = $exactpath;
                }
                else{
                $response["success"] = false;
                   $response["message"] = "Failed! image(s) not uploaded";
                  }
            }

            if($request->input('photo2')){
                $file2 = $request->input('photo2');
                    $filename2 = time().rand(). '.png';
                    $userFile2 = $request->input('imei');
                    $uploadsPath2 = public_path('uploads/voitures');
                    $publicPath2 = $uploadsPath2 . '/'. $userFile2 . '/' . $filename2;
                $exactpath2 = '/uploads/voitures/'.$userFile2 . '/' . $filename2;
                if (!file_exists(dirname($publicPath2))) {
                        mkdir(dirname($publicPath2), 0755, true);
                }
                if(file_put_contents($publicPath2, file_get_contents($file2))){
                    $response["success"] = true;
                    $response["path"] = $exactpath2;
                }
                else{
                $response["success"] = false;
                    $response["message"] = "Failed! image(s) not uploaded";
                    }
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
                'photo1' => $exactpath,
                'photo2' => $exactpath2,

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

                if($request->input('photo1')){
                    $file = $request->input('photo1');
                      $filename = time().rand(). '.png';
                      $userFile = $request->input('imei');
                      $uploadsPath = public_path('uploads/voitures');
                      $publicPath = $uploadsPath . '/'. $userFile . '/' . $filename;
                    $exactpath = '/uploads/voitures/'.$userFile . '/' . $filename;
                    if (!file_exists(dirname($publicPath))) {
                            mkdir(dirname($publicPath), 0755, true);
                    }
                    if(file_put_contents($publicPath, file_get_contents($file))){
                        $response["success"] = true;
                        $response["path"] = $exactpath;
                    }
                    else{
                    $response["success"] = false;
                       $response["message"] = "Failed! image(s) not uploaded";
                      }
                }

                if($request->input('photo2')){
                    $file2 = $request->input('photo2');
                        $filename2 = time().rand(). '.png';
                        $userFile2 = $request->input('imei');
                        $uploadsPath2 = public_path('uploads/voitures');
                        $publicPath2 = $uploadsPath2 . '/'. $userFile2 . '/' . $filename2;
                    $exactpath2 = '/uploads/voitures/'.$userFile2 . '/' . $filename2;
                    if (!file_exists(dirname($publicPath2))) {
                            mkdir(dirname($publicPath2), 0755, true);
                    }
                    if(file_put_contents($publicPath2, file_get_contents($file2))){
                        $response["success"] = true;
                        $response["path"] = $exactpath2;
                    }
                    else{
                    $response["success"] = false;
                        $response["message"] = "Failed! image(s) not uploaded";
                        }
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
                    'photo1' => $exactpath,
                    'photo2' => $exactpath2,
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
