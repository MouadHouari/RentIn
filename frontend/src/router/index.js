import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import MasterLayout from "../layouts/agence/MasterLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import LouerVoitures from "../pages/louerVoitures";
import Rent from "../pages/Rent";
import DemandeReservation from "../pages/demandeReservation";

import VoitureList from "../pages/Voiture";
import VoitureCreate from "../pages/VoitureCreate";
import VoitureEdit from "../pages/VoitureEdit";

import OffreList from "../pages/Offre";
import OffreCreate from "../pages/OffreCreate";
import OffreEdit from "../pages/OffreEdit";



function MyRouter(){


    return(
           <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/login" element={<Login />}/> 

                <Route path="/voitures" element={<VoitureList />}/>               
                <Route path="/voitures/create" element={<VoitureCreate />}/>
                <Route path="/voitures/:id/edit" element={<VoitureEdit />}/>

                <Route path="/mesoffres" element={<OffreList />}/>               
                <Route path="/mesoffres/create" element={<OffreCreate />}/>
                <Route path="/mesoffres/:id/edit" element={<OffreEdit />}/>
                <Route path="/mesdemandes" element={<DemandeReservation />}/>     

                <Route path="/offres" element={<LouerVoitures />}/>     
                <Route path="/réserver/:id" element={<Rent />}/>     


           </Routes>
        );
}

export default MyRouter;
