import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; 
import 'remixicon/fonts/remixicon.css';
import Loading from "../components/agence/Loading";
import swal from "sweetalert";


function Voiture (){

    const[loading, setLoading]= useState([true]);
    const[voitures, setVoitures]= useState([]);
    const[id_imei, setImei]= useState();
    const id_agence = parseInt(localStorage.getItem("auth_id"));

    useEffect(() => {


        axios.get(`http://localhost:8000/api/voitures/${id_agence}`).then(res =>{
            console.log(res)
             setVoitures(res.data.voitures);
            setLoading(false);
        }).catch(function(error) {
            
            swal("Aucune voiture","Veuillez ajouter vos voitures ","info") 
            setLoading(false);
            
        });




    },[])

    //-------function pour envoyer le responsable de l'agence vers traccar pour localiser les voitures-------// 
    
    function locateVehicules(e) {
        e.preventDefault();
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        
        const secondFormData=new URLSearchParams();
        secondFormData.append('expiration', '2027-12-31T23:59:59Z');
        
        const secondAuthHeader = `Basic ${btoa(`${email}:${password}`)}`;

        const secondXhr = new XMLHttpRequest();
        const secondUrl = 'http://localhost:8082/api/session/token';

        secondXhr.open('POST', secondUrl);
        secondXhr.setRequestHeader('Authorization', secondAuthHeader);
        secondXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        secondXhr.onreadystatechange = function () {
          if (secondXhr.readyState === XMLHttpRequest.DONE) {
            if (secondXhr.status === 200) {
              console.log('Second post request successful:', secondXhr.responseText);
              // Store the second response data in localStorage
              localStorage.setItem('tokenData', JSON.stringify(secondXhr.responseText));
              // Ouvrire nouvelle tab dont traccar
              window.open(`http://localhost:8082/?token=${localStorage.getItem('tokenData')}`, '_blank');
            } else {
              console.error('Error making second post request:', secondXhr.status, secondXhr.statusText);
             
            }
          }
        };

        secondXhr.send(secondFormData);
     }
     

     //-----Supprimer-la voiture de traccar------//

     const deleteDevice = (uniqueId) => {
 
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const AuthHeader = `Basic ${btoa(`${email}:${password}`)}`;
        const xhr = new XMLHttpRequest();
        const url = `http://localhost:8082/api/devices?uniqueId=${encodeURIComponent(uniqueId)}`;
      
          //------recuperation de l'id de la voiture dans traccar--/

        xhr.open('GET', url);
        xhr.setRequestHeader('Authorization', AuthHeader);
      
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                var id_imei = "";
                id_imei = response.map( (item, index ) => {
                    return(item.id); })
                console.log('GET request successful:');

                //--------suppression de la voiture de traccar-------------//

                const xhr2 = new XMLHttpRequest();
                const url2 = `http://localhost:8082/api/devices/${id_imei}`;
            
                xhr2.open('DELETE', url2);
                xhr2.setRequestHeader('Authorization', AuthHeader);
            
                xhr2.onreadystatechange = function () {
                if (xhr2.readyState === XMLHttpRequest.DONE) {
                    if (xhr2.status === 204) {
                    console.log('DELETE request successful');
                    } else {
                    console.error('Error making DELETE request:', xhr2.status, xhr2.statusText);
                    // Handle the error as needed
                    }
                }
                };
            
                xhr2.send();
 
            } else {
              console.error('Error making GET request:', xhr.status, xhr.statusText);
            }
          }
        };
      
        xhr.send();

    
      };

      //---suppressoin de la voiture dans la plateforme----------//
      const supprimervoiture = (e, id) => {
          e.preventDefault();
  
          const thisClicked = e.currentTarget;
          
          console.log("imei", id_imei);
          axios.delete(`http://localhost:8000/api/voitures/${id}/delete`)
          .then(res => {
              swal("Supprimée","La voiture est bien supprimée","success");
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
    
        const suppression = (e, id, imei) => {
            e.preventDefault();
            deleteDevice(imei)
            supprimervoiture(e, id)

        }

    if(loading){
        return(
            <div>
                <Loading />
            </div>
        );
    }

    var voitureDetails = "";
    voitureDetails = voitures.map( (item, index ) => {
         return (
            
            <tr key={index}>
                <td>{item.imei}</td>
                <td>{item.marque}</td>
                <td>{item.modele}</td>
                <td>{item.annee}</td>
                <td>{item.boitedevitesse}</td>
                <td>{item.carburant}</td>
                <td>{item.portes}</td>
                

                <td>
                    <button type="button" onClick={(e) => suppression(e, item.id,item.imei)} className="btn btn-outline-danger "><i class="ri-delete-bin-2-fill"></i></button>
                    <Link to={`/voitures/${item.id}/edit`} className="btn btn-outline-dark ms-2"><i class="ri-edit-2-fill"></i></Link>
                </td>
            </tr>
         )   
        // }
    });

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Liste de voiture {id_imei}
                                <button   onClick={locateVehicules} className="btn btn-success  float-end"><i className="ri-road-map-line me-1"></i>Localiser mes voitures </button>
                                <Link to="/voitures/create" className="btn btn-outline-dark me-3 float-end"><i class="ri-add-line me-1"></i>Ajouter voiture </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>IMEI</th>
                                        <th>Marque</th>
                                        <th>Modele</th>
                                        <th>Année</th>
                                        <th>Boite de vitesse</th>
                                        <th>Carburant</th>
                                        <th>Portes</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {voitureDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Voiture;