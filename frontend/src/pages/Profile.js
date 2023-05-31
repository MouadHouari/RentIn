import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import Loading from "../components/agence/Loading";
import { Container, Row, Col } from "reactstrap";
import 'remixicon/fonts/remixicon.css';


function Profile(){

  const id = localStorage.getItem('auth_id');
  const[isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const[inputErrorList, setInputErrorList] = useState({});
  const[reservations, setReservations]= useState([]);
  const[agence,setAgence] = useState(false);
  const[aucuneDemande,setAucuneDemande] = useState(false);
  const[user, setProfile] = useState([]);


    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
        .then((res) => {
            setProfile(res.data.user);
            if(res.data.user.agence == 1)
            setAgence(true);
            setLoading(false);
        }).catch(function(error) {
            swal("error",error.data.message,"warning")
            
        });
        
        
    },[id]);

  

    useEffect(() => {
        if(!agence){
            
            axios.get(`http://localhost:8000/api/reservations/0/${id}`).then(res =>{
                console.log(res)
                setReservations(res.data.reservations);
                setLoading(false);
            }).catch(function(error) {
                setAucuneDemande(true);
            });;
        }

    },[])

    
    if (isLoading) return <Loading />;

        var reservationDetails = "";
        reservationDetails = reservations.map( (item) => { 
    
                
                 if(item.etat=="en Traitemant"){
                     return(
                     <div class="alert alert-secondary" role="alert">
                     Votre demande de réservation de la voiture {item.marque} {item.modele} est en cours de traitemant.
                    </div>
                    )
                 }
                  if(item.etat=="Acceptée"){
                     return(
                         
                     <div class="alert alert-success" role="alert">
                      Votre demande de réservation de la voiture {item.marque} {item.modele} a été accéptée,
                      Venez récupérez les clés!
                     </div>
                     )
                 }
                  if(item.etat=="Refusée"){
                     return(
                     <div class="alert alert-danger" role="alert">
                      Votre demande de réservation de la voiture {item.marque} {item.modele} a été refusée!
                     </div>
                     )
                  }
                  else{
                     return(
                         <div class="alert alert-secondary" role="alert">
                         Vous n'avez pas encore demander aucune voiture.
                         </div>
                         )  
                    }
                   
            
           
        });
    
    

  const img = "uploads/profile.png";


    return(
        <>
        <div className="container mt-5 ">
             <div className="row">
                 <div className="col-md-12 mb-4">
                     <div className="card">
                         <div className="card-body">
            <section>
                <Container>
                    <Row>
                         <Col lg='15' className="align-items-center">
                         <div class="card user-card-full mt-5">
                                                    <div class="row m-l-0 m-r-0">
                                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                                            <div class="card-block text-center text-white">
                                                                <div class="m-b-25">
                                                                    <img src="\uploads\profil.png" class="img-radius" alt="User-Profile-Image" />
                                                                </div>
                                                                <h6 class="f-w-600">{user.name} </h6>
                                                                <p><b>Type :</b> {agence ? ( <p>Agence</p>) : ( <p>Client</p>) } </p>
                                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-8">
                                                            <div class="card-block">
                                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Information</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Nom Complet</p>
                                                                        <h6 class="text-muted f-w-400"> {user.name} </h6>
                                                                    </div>
                                                                    {agence && ( 
                                                                        <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Agence</p>
                                                                        <h6 class="text-muted f-w-400">{user.agence_name}</h6>
                                                                    </div>)}
                                                                    
                                                                </div>
                                                                <h6 class="m-b-20 p-b-5 b-b-default m-t-40 f-w-600">Compte</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Email</p>
                                                                        <h6 class="text-muted f-w-400">{user.email}</h6>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Telephone</p>
                                                                        <h6 class="text-muted f-w-400">0{user.tel}</h6>
                                                                    </div>
                                                                </div>
                                                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Col>
                                                {!agence && (
                                                    
                                                    <Col lg="7" className="mt-5">
                                                        <div className="booking-info mt-5">
                                                            
                                                            <h4 className="mb-4 fw-bold">Mes demandes</h4>
                                                            
                                                                { aucuneDemande ? (
                                                                    <div class="alert alert-secondary" role="alert">
                                                                    Vous n'avez pas encore demander aucune voiture.
                                                                    </div>
                                                                ):(
                                                                    reservationDetails
                                                                )}
                                                        </div>
                                                    </Col>
                                                
                                                )}
                        
                        
                                        </Row>
                                    </Container>
                                </section>
                                </div>    
                                </div>    
                                </div>    
                                </div>    
                                </div> 
        </>

    );



};


export default Profile;
