import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import swal from "sweetalert";
import Loading from "../components/agence/Loading";

function OffreEdit(){

    let {id} = useParams();
    const id_agence = parseInt(localStorage.getItem("auth_id"));
    const navigate = useNavigate();
    const[loading, setLoading] = useState(true);
    const[inputErrorList, setInputErrorList] = useState({});
    const[offre, setOffre] = useState({})
    const[voitures, setVoitures]= useState([]);

    useEffect(() => {

        
        axios.get(`http://localhost:8000/api/offres/${id_agence}/${id}/edit`).then(res =>{
            console.log(res)
            setOffre(res.data.offre);
            setLoading(false);
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

    },[id_agence],[id])

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

    const modifierOffre = (e) =>{
        e.preventDefault();
        setLoading(true);        

        const data = {
            voiture_id: offre.voiture_id,
            ville: offre.ville,
            prix: offre.prix,
            description: offre.description,
            etat: offre.etat
        }

        axios.put(`http://localhost:8000/api/offres/${id_agence}/${id}/edit`, data)
        .then(res => {

            swal("C'est bon",res.data.message,"success");
            navigate('/mesoffres')
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

    if(Object.keys(offre).length === 0){
        return(
            <div className="container mt-5 ">
                <h4>Offre est non trouvée</h4>
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
                                <h4>Modifier offre 
                                    <Link to="/mesoffres" className="btn btn-danger float-end">Annuler </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <Form onSubmit={modifierOffre}>
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
                                        placeholder="Veuillez écrire une description sur les informations de la voiture et de l'offre "></textarea>
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
                                        <button type="submit" className="btn btn-secondary item-center">Enregistrer</button>
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

export default  OffreEdit;