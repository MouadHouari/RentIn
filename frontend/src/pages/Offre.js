import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; 
import swal from "sweetalert";
import Loading from "../components/agence/Loading";

function Offre (){

    const id_agence = parseInt(localStorage.getItem("auth_id"));
    const[loading, setLoading]= useState([true]);
    const[offres, setOffres]= useState([]);

    useEffect(() => {

        axios.get(`http://localhost:8000/api/offres/${id_agence}`).then(res =>{
            console.log(res)
            setOffres(res.data.offres);
            setLoading(false);
        }).catch(function(error) {
            
            swal("Aucun offre","Veuillez ajouter un offre ","info") 
            setLoading(false);
            
        });

    },[])

    const supprimeroffre = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;

        axios.delete(`http://localhost:8000/api/offres/${id_agence}/${id}/delete`)
        .then(res => {

            alert(res.data.message);
            thisClicked.closest("tr").remove();

        })
        .catch(function(error) {
           
            if(error.response.status === 404){
                alert(error.response.data.message) 
                thisClicked.innerText = "Supprimer";
            }
            if(error.response.status === 500){
                alert(error.response.data) 
                setLoading(false);
            } 
        });

    }

    if(loading){
        return(
            <div>
                <Loading />
            </div>
        );
    }

    var offreDetails = "";
    offreDetails = offres.map( (item, index ) => {

         return (
            <tr key={index}>
                <td>{item.marque}</td>
                <td>{item.modele}</td>
                <td>{item.boitedevitesse}</td>
                <td>{item.ville}</td>
                <td>{item.prix} Dhs/jour</td>
                <td>{item.description}</td>
                <td className="align-middle"><span  className= {item.etat === 'Valable' ? 'badge text-bg-success' : 'badge text-bg-danger'} >{item.etat}</span></td>
                
                <td className="align-middle">
                    <Link to={`/mesoffres/${item.id}/edit`} className="btn btn-outline-dark"><i class="ri-edit-2-fill"></i></Link>
                
                    <button type="button" onClick={(e) => supprimeroffre(e, item.id)} className="btn btn-outline-danger mt-2"><i class="ri-delete-bin-2-fill"></i></button>
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
                            <h4>Liste des offres
                                <Link to="/mesdemandes" className="btn btn-dark ms-2 float-end"><i class="ri-folder-open-line"></i> Consulter demandes de réservation</Link>
                                <Link to="/mesoffres/create" className="btn btn-outline-dark float-end"><i class="ri-add-line"></i>Ajouter un offre </Link> 
                            </h4>
                        </div>
                         <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        
                                        <th>Marque</th>
                                        <th>Modéle</th>
                                        <th>Vitesse</th>
                                        <th>Ville</th>
                                        <th>Prix</th>
                                        <th>Description</th>
                                        <th>Etat</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offreDetails} 
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Offre;