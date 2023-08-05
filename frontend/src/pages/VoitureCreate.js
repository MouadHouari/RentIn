import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import swal from "sweetalert";
import Loading from "../components/agence/Loading";

function VoitureCreate(){

    const navigate = useNavigate();

    const[loading, setLoading] = useState(false);
    
    const[inputErrorList, setInputErrorList] = useState({});
    
    const[voiture, setVoiture] = useState({
        imei: '',
        marque: '',
        modele: '',
        photo1: '',
        photo2: '',
        annee: '',
        boitedevitesse: '',
        carburant: '',
        portes: '',
        agence_id: parseInt(localStorage.getItem("auth_id"))
    })

    const [picture, setPicture] = useState(null);
    const [picture2, setPicture2] = useState(null);
    const handeleInput = (e) => {
        e.persist();
        setVoiture({...voiture, [e.target.name]: e.target.value  })
    }
    const handeleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              setPicture(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
    }
    const handeleImage2 = (e) => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              setPicture2(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
    }


    //---------Creation de la voiture dans traccar------------//

    const createDevice = (uniqueId, name) => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const AuthHeader = `Basic ${btoa(`${email}:${password}`)}`;
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:8082/api/devices';
        const data = JSON.stringify({ uniqueId, name, disabled: false });
      
        xhr.open('POST', url);
        xhr.setRequestHeader('Authorization', AuthHeader);
        xhr.setRequestHeader('Content-Type', 'application/json');
      
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log('POST request successful:', xhr.responseText);
            } else {
              console.error('Error making POST request:', xhr.status, xhr.statusText);
            }
          }
        };
      
        xhr.send(data);
      };
      
      
      //---------Creation de la voiture dans la plateforme------------//

    const saveVoiture = (e) =>{
        e.preventDefault();
        setLoading(true);   

        const formData = new FormData();
        formData.append('photo1',picture);
        formData.append('photo2',picture2);
        formData.append('imei',voiture.imei);
        formData.append('marque',voiture.marque);
        formData.append('modele',voiture.modele);
        formData.append('annee',voiture.annee);
        formData.append('boitedevitesse',voiture.boitedevitesse);
        formData.append('carburant',voiture.carburant);
        formData.append('portes',voiture.portes);
        formData.append('agence_id',voiture.agence_id);

        // const data = {
        //     imei: voiture.imei,
        //     marque: voiture.marque,
        //     modele: voiture.modele,
        //     photo1: selectedFile,
        //     // photo2: voiture.photo2,
        //     annee: voiture.annee,
        //     boitedevitesse: voiture.boitedevitesse,
        //     carburant: voiture.carburant,
        //     portes: voiture.portes,
        //     agence_id: voiture.agence_id
        // }

        // formData.append('photo1',selectedFile)

        axios.post(`http://localhost:8000/api/voitures`, formData)
        .then(res => {
            
            const uniqueId= voiture.imei;
            const name=voiture.marque+' '+voiture.modele;
            createDevice(uniqueId, name);

            swal("Ajoutée","La voiture est bien ajoutée","success")
            navigate('/voitures')
            setLoading(false);
        })
        .catch(function(error) {
            if(error.response.status === 422){
                setInputErrorList(error.response.data.errors) 
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

    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Ajouter voiture
                                    <Link to="/voitures" className="btn btn-danger float-end">Annuler </Link>
                                </h4>
                            </div>
                            <div className="tab-pane card-body ">
                                <div className="row ">
                                    <Form onSubmit={saveVoiture}>
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
                                            <input type="file" name="photo1" accept="image/*"  onChange={handeleImage} className="form-control"/>
                                            <span className="text-danger">{inputErrorList.photo1}</span>
                                        </FormGroup>
                                        <FormGroup className="col-md-4 form-group ms-5 mb-3">
                                            <label>Photo 2:</label>
                                            <input type="file" name="photo2"  onChange={handeleImage2} className="form-control"/>
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
                                            <button type="submit" className="btn btn-secondary item-center">Ajouter</button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        

        
    )
}

export default VoitureCreate;