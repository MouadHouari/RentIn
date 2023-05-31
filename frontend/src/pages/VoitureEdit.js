import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import Loading from "../components/agence/Loading";
import swal from "sweetalert";

function VoitureEdit(){

    let {id} = useParams();

    const navigate = useNavigate();
    const[loading, setLoading] = useState(true);
    const[inputErrorList, setInputErrorList] = useState({});
    const[voiture, setVoiture] = useState({})
    const [picture, setPicture] = useState([]);
    const[deviceId, setDeviceId]=useState();

    useEffect(() => {


        axios.get(`http://localhost:8000/api/voitures/${id}/edit`).then(res =>{
            console.log(res)
            setVoiture(res.data.voiture);
            setLoading(false);
            setDeviceId(res.data.voiture.imei);
        })
        .catch(function(error) {
            
            if(error.response.status === 404){
                alert(error.response.data.message) 
                setLoading(false);
            }
            if(error.response.status === 500){
                alert(error.response.data) 
                setLoading(false);
            } 
        });;

    },[id])

    const handeleInput = (e) => {
        e.persist();
        setVoiture({...voiture, [e.target.name]: e.target.value  })
    }
    const handeleImage = (e) => {
        setPicture({ photo1: e.target.files[0] });
    }

    const updateDevice = (  uniqueId, name) => {

        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const AuthHeader = `Basic ${btoa(`${email}:${password}`)}`;
        const xhr2 = new XMLHttpRequest();
        const url2 = `http://localhost:8082/api/devices?uniqueId=${encodeURIComponent(uniqueId)}`;
      
          //------recuperation de l'id de la voiture dans traccar--/

        xhr2.open('GET', url2);
        xhr2.setRequestHeader('Authorization', AuthHeader);
      
        xhr2.onreadystatechange = function () {
          if (xhr2.readyState === XMLHttpRequest.DONE) {
            if (xhr2.status === 200) {
                const response = JSON.parse(xhr2.responseText);
                console.log('response = :', response);
                var id = response[0].id;
                console.log('GET request id successfully:', id);
                
                //---------modification de la voiture sur traccar--------//
        
                const xhr = new XMLHttpRequest();
                const url = `http://localhost:8082/api/devices/${id}`;
                const data = JSON.stringify({ id: id, uniqueId, name, disabled: false });
            
                xhr.open('PUT', url);
                xhr.setRequestHeader('Authorization', AuthHeader);
                xhr.setRequestHeader('Content-Type', 'application/json');
            
                xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                    console.log('PUT request successful:', xhr.responseText);
                    } else {
                    console.error('Error making PUT request:', xhr.status, xhr.statusText);
                    }
                }
                };
            
                xhr.send(data);

    } else {
        console.error('Error making GET request:', xhr2.status, xhr2.statusText);
      }
    }
  };

  xhr2.send();

      };


      const modification = (e) =>{
        e.preventDefault();
        const name=voiture.marque+' '+voiture.modele;
        console.log("imei deviceId =",deviceId)
        updateDevice(deviceId,  name);
        modifierVoiture(e, id);
      }

    const modifierVoiture = (e) =>{
        e.preventDefault();
        setLoading(true);        


        const data = {
            imei: voiture.imei,
            marque: voiture.marque,
            modele: voiture.modele,
        // photo1: voiture.photo1,
        // photo2: voiture.photo1,
            annee: voiture.annee,
            boitedevitesse: voiture.boitedevitesse,
            carburant: voiture.carburant,
            portes: voiture.portes,
            agence_id: parseInt(localStorage.getItem("auth_id"))
        }

        axios.put(`http://localhost:8000/api/voitures/${id}/edit`, data)
        .then(res => {

            swal("Modifée","La voiture est bien modifiée","success")      
            navigate('/voitures')
            
            setLoading(false);
        })
        .catch(function(error) {
            if(error.response.status === 422){
                setInputErrorList(error.response.data.errors) 
                setLoading(false);
            }
            if(error.response.status === 404){
                alert(error.response.data.message) 
                setLoading(false);
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

    if(Object.keys(voiture).length === 0){
        return(
            <div className="container mt-5 ">
                <h4>Voiture est non trouvée</h4>
            </div>
        )
    }

    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Modifier voiture
                                    <Link to="/voitures" className="btn btn-danger float-end">Annuler </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <Form onSubmit={modification}>
                                            <FormGroup className="d-inline-block ms-5 mb-4">
                                                <label className="ms-1">IMEI</label>
                                                <input type="number" name="imei" value={voiture.imei} onChange={handeleInput} className="form-control"/>
                                                <span className="text-danger">{inputErrorList.imei}</span>
                                            </FormGroup>
                                            <br></br>
                                            <FormGroup className="d-inline-block col-md-4 ms-5 mb-4">
                                                <label>Marque</label>
                                                <input type="text" name="marque" value={voiture.marque} onChange={handeleInput} className="form-control"/>
                                                <span className="text-danger">{inputErrorList.marque}</span>
                                            </FormGroup>
                                            <FormGroup className="d-inline-block col-md-4 float-end me-5  mb-4">
                                                <label>Modéle</label>
                                                <input type="text" name="modele" value={voiture.modele} onChange={handeleInput} className="form-control"/>
                                                <span className="text-danger">{inputErrorList.modele}</span>
                                            </FormGroup>
                                            <FormGroup className="col-md-4 form-group ms-5 mb-3">
                                                <label>Photo 1:</label>
                                                <input type="file" name="photo1"  onChange={handeleImage} className="form-control"/>
                                                <span className="text-danger">{inputErrorList.photo1}</span>
                                            </FormGroup>
                                            <FormGroup className="col-md-4 form-group ms-5 mb-3">
                                                <label>Photo 2:</label>
                                                <input type="file" name="photo1"  onChange={handeleImage} className="form-control"/>
                                                <span className="text-danger">{inputErrorList.photo2}</span>
                                            </FormGroup>
                                            <FormGroup className="d-inline-block mb-3 me-5 ms-5 ">
                                                <label>Boite de vitesse</label>
                                                <select className="form-select" name="boitedevitesse" aria-label="Default select example" value={voiture.boitedevitesse}  onChange={handeleInput}>
                                                    <option >Veuillez choisir le type de la boite de vitesse</option>
                                                    <option value="Automatique">Automatique</option>
                                                    <option value="Manuelle">Manuelle</option>                                   
                                                </select>
                                                <span className="text-danger">{inputErrorList.boitedevitesse}</span>
                                            </FormGroup>
                                            <FormGroup className="d-inline-block mb-3  ms-5">
                                                <label>Carburant</label>
                                                <select className="form-select" name="carburant" value={voiture.carburant} aria-label="Default select example" onChange={handeleInput}>
                                                    <option >Veuillez choisir le type de carburant </option>
                                                    <option value="Essence">Essence</option>
                                                    <option value="Diesel">Diesel</option>                                   
                                                    <option value="Hybride">Hybride</option>                                   
                                                    <option value="Electrique">Electrique</option>                                   
                                                </select>
                                                <span className="text-danger">{inputErrorList.carburant}</span>
                                            </FormGroup>
                                            <br></br>
                                            <FormGroup className="col-md-4 d-inline-block  form-group mb-3 ms-5 me-4">
                                                <label>Année</label>
                                                <input type="number" name="annee" value={voiture.annee} onChange={handeleInput} className="form-control"/>
                                                <span className="text-danger">{inputErrorList.annee}</span>
                                            </FormGroup>
                                            <FormGroup className="col-md-3  d-inline-block ms-5 mb-3">
                                                <label>Nombre de portes</label>
                                                <input type="number" name="portes" value={voiture.portes} onChange={handeleInput} className="form-control"/>
                                                <span className="text-danger">{inputErrorList.portes}</span>
                                            </FormGroup>  
                                            
                                            <div className="ms-5 mb-3">
                                                <button type="submit" className="btn btn-secondary item-center">Enregistrer</button>
                                            </div>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        

        
    )
}

export default  VoitureEdit;