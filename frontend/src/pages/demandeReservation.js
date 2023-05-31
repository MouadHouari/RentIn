import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import 'remixicon/fonts/remixicon.css';
import Loading from "../components/agence/Loading";
import swal from "sweetalert";

function DemandeReservation (){
    
    const id_agence = parseInt(localStorage.getItem("auth_id"));
    const[loading, setLoading]= useState([true]);
    const[reservations, setReservations]= useState([]);


    useEffect(() => {

        axios.get(`http://localhost:8000/api/reservations/${id_agence}/0`).then(res =>{
            console.log(res)
            setReservations(res.data.reservations);
            setLoading(false);
        });

    },[])

    if(loading){
        return(
            <div>
                <Loading />
            </div>
        );
    }

    const accepterDemande = (e, id) => {
        e.preventDefault();
        const data = {
            etat: "Acceptée"
        }

        axios.put(`http://localhost:8000/api/reservations/${id_agence}/${id}/edit`,data)
        .then(res => {
            swal("Acceptée","Demande bien acceptée","success").then((value) => {
                window.location.reload();
              });

        })
        .catch(function(error) {
           
            if(error.response.status === 404){
                alert(error.response.data.message) 
            }
            if(error.response.status === 500){
                alert(error.response.data) 
                setLoading(false);
            } 
        });

    }

    const refuserDemande = (e, id) => {
        e.preventDefault();
        const data = {
            etat: "Refusée"
        }
        axios.put(`http://localhost:8000/api/reservations/${id_agence}/${id}/edit`,data)
        .then(res => {
            swal("Refusée","Demande bien refusée","success").then((value) => {
                window.location.reload();
              });
        })
        .catch(function(error) {
           
            if(error.response.status === 404){
                alert(error.response.data.message) 
            }
            if(error.response.status === 500){
                alert(error.response.data) 
                setLoading(false);
            } 
        });

    }

    var personnes="";
    var bagages="";
    var reservationDetails = "";
    reservationDetails = reservations.map( (item, index ) => {
       
         if(item.personnes==5){
            personnes="+4 personnes"
        }else{
            personnes= item.personnes+" personnes";
         } 
       
        if(item.bagages==5){
            bagages="+4 bagages"
        }else{
            bagages= item.bagages+" bagages";
         } 
        
         return (
            <tr key={index}>
                <td className="align-middle">{item.prenom} {item.nom}</td>
                <td className="align-middle">{item.email}</td>
                <td className="align-middle">0{item.tel}</td>
                <td className="align-middle object-fit-fill ">{personnes}</td>
                <td className="align-middle">{bagages} </td>
                <td className="align-middle">{item.marque} {item.modele}</td>
                <td className="align-middle">{item.dateDebut} </td>
                <td className="align-middle">{item.dateRetour}</td>
                <td className="align-middle">{item.message}</td>
                <td className="align-middle">{item.totale} Dhs</td>
                <td className="align-middle"><span  className= {item.etat === 'en Traitemant' ? 'badge text-bg-secondary' : item.etat === 'Acceptée' ? 'badge text-bg-success' :'badge text-bg-danger'} >{item.etat}</span></td>
                
                <td className="align-middle">
                    <button className="btn btn-outline-light fs-5 me-3" onClick={ (e) => accepterDemande(e, item.id) }><i class="ri-check-double-fill"></i></button>
                </td>
                <td className="align-middle">
                    <button className="btn btn-outline-light fs-5 me-3" onClick={(e) => refuserDemande(e, item.id)}><i class="ri-close-circle-fill"></i></button>
                </td>
            </tr>
         )   
       
    });

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Mes demandes</h4>
                        </div>
                         <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nom </th>
                                        <th>email</th>
                                        <th>Telephone</th>
                                        <th></th>
                                        <th></th>
                                        <th>Voiture</th>
                                        <th>De</th>
                                        <th>À</th>
                                        <th>Message de client</th>
                                        <th>Totale</th>
                                        <th>Etat</th>
                                        <th className="">Accepter</th>
                                        <th>Refuser</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservationDetails} 
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DemandeReservation;