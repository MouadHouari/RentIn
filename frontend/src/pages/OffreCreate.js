import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Form, FormGroup } from "reactstrap";
import Loading from "../components/agence/Loading";

function OffreCreate(){

    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[voitures, setVoitures]= useState([]);
    const[inputErrorList, setInputErrorList] = useState({});
    const id_agence = parseInt(localStorage.getItem("auth_id"));
    const[offre, setOffre] = useState({
        
        voiture_id: '',
        ville: '',
        prix: '',
        description: '',
        etat: '',
        agence_id: parseInt(localStorage.getItem("auth_id"))
    })

    useEffect(() => {


        axios.get(`http://localhost:8000/api/voitures/${id_agence}`).then(res =>{
            console.log(res)
             setVoitures(res.data.voitures);
            setLoading(false);
        });

    },[])

    const handeleInput = (e) => {
        e.persist();
        setOffre({...offre, [e.target.name]: e.target.value  })
    }

    const saveOffre = (e) =>{
        e.preventDefault();
        setLoading(true);        

        const data = {
            voiture_id: offre.voiture_id,
            ville: offre.ville,
            prix: offre.prix,
            description: offre.description,
            etat: offre.etat,
            agence_id: parseInt(localStorage.getItem("auth_id"))
        }

        axios.post(`http://localhost:8000/api/offres`, data)
        .then(res => {
            swal("Ajoutée","L'offre est bien ajoutée","success")
            navigate('/mesoffres')
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
                                <h4>Ajouter offre
                                    <Link to="/mesoffres" className="btn btn-danger float-end">Annuler </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={saveOffre}>
                                    <FormGroup className="d-inline-block col-md-4 mb-3">
                                        <label>Voiture</label>
                                        <select className="form-select" name="voiture_id" aria-label="Default select example" value={offre.voiture_id}  onChange={handeleInput}>
                                                <option >Veuillez choisir la voiture</option>
                                                {voitures.map((voiture) => (
                                                    <option key={voiture.id} value={voiture.id}>
                                                    {voiture.marque} {voiture.modele}
                                                    </option>
                                                ))}                                 
                                        </select>
                                        <span className="text-danger">{inputErrorList.voiture_id}</span>
                                    </FormGroup>
                                    <br></br>
                                    <FormGroup className="d-inline-block col-md-4  mb-3">
                                        <label>Ville</label>
                                        <input type="text" name="ville" value={offre.ville} onChange={handeleInput} className="form-control"/>
                                        <span className="text-danger">{inputErrorList.ville}</span>
                                    </FormGroup>
                                    <FormGroup className="d-inline-block col-md-4 ms-5 mb-3">
                                        <label>Prix</label>
                                        <input type="text" name="prix" value={offre.prix} onChange={handeleInput} className="form-control"/>
                                        <span className="text-danger">{inputErrorList.prix}</span>
                                    </FormGroup>  
                                    <FormGroup >
                                        <label>Description</label>  
                                        <textarea rows={5} type='textarea' name="description" value={offre.description} onChange={handeleInput} className='description' 
                                        placeholder="Veuillez écrire une description sur les informations de la voiture et l'offre "></textarea>
                                        <span className="text-danger">{inputErrorList.description}</span>
                                    </FormGroup>
                                    
                                    <FormGroup className="d-inline-block col-md-4 mb-3">
                                        <label>Etat</label>
                                        <select className="form-select" name="etat" aria-label="Default select example" value={offre.etat}  onChange={handeleInput}>
                                            <option >Veuillez choisir l'état de l'offre</option>
                                            <option value="Réservée">Réservée</option>
                                            <option value="Valable">Valable</option>                                   
                                        </select>
                                        <span className="text-danger">{inputErrorList.etat}</span>
                                    </FormGroup>    
                                    
                                    <FormGroup className="mb-3">
                                        <button type="submit" className="btn btn-secondary item-center">Ajouter</button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        

        
    )
}

export default OffreCreate;