<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;

class RegisterController extends BaseController

{
    /**
    * Register api
    *
    * @return \Illuminate\Http\Response
    */

    /** get all users */
    public function index()
    {
        $users = User::all();
        return $this->sendResponse($users, 'Displaying all users data');
    }

    public function show($id){
        $user = User::find($id);
        if($user){
             
            return response()->json([
                'status' => 200,
                'user' => $user
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Utilisateur est non trouvée!!'
            ],404);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'tel' => 'required|max:10',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {    
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]); 
        }
        else{
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'tel'=>$request->tel,
                'agence'=>$request->agence,
                'agence_name'=>$request->agence_name,
                'password'=>Hash::make($request->password),
                'c_password'=>$request->c_password,
                
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Bien enregistrer',
            ]);  
        }


    }

    /**
    * Login api
    *
    * @return \Illuminate\Http\Response
    */

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]); 
        }
        else{
            $user = User::where('email', $request->email)->first();

            if(! $user || ! Hash::check($request->password, $user->password)){
                return response()->json([
                    'status'=>401,
                    'message'=>'Email ou mot de passe incorrect',
                ]);  
            }
            else{
                $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'id'=>$user->id,
                    'token'=>$token,
                    'message'=>'vous êtes bien connecté',
                ]);  
            }
        }
    }

    public function logout(){

        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'vous êtes bien déconnecté',
        ]);
    }
 }