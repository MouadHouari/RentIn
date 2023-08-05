import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import Loading from "../components/agence/Loading";
import { Container, Row, Col } from "reactstrap";
import 'remixicon/fonts/remixicon.css';
import { Form, FormGroup } from "reactstrap";
import {Center,HStack,VStack,Text,Heading,Spacer,} from "@chakra-ui/react";
  


const Rent = () => {
  let {id} = useParams();
  const[isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const[totale, setTotale] = useState({});
  const[offre, setOffre] = useState({});
  const[inputErrorList, setInputErrorList] = useState({});
  const rentalDate = useRef();
  const returnDate = useRef();
  
  const[reservation, setReservation] = useState({
        offre_id: '',
        nom: '',
        prenom: '',
        email: '',
        tel:  '',
        personnes: '' ,
        bagages: '',
        dateDebut: '',
        dateRetour: '',
        message: '',
        totale: '',
        etat: '',
  });

  
  useEffect(() => {

    if(!localStorage.getItem('auth_token')){
        swal("Accées refusée","Vous devez se connectez pour réserver une voiture","warning");
        navigate("/login")
    }

      axios.get(`http://127.0.0.1:8000/api/offres/0/${id}`)
      .then((res) => {
          setOffre(res.data.offre[0]);
          setTotale(res.data.offre[0].prix);
          setLoading(false);
        }).catch(function(error) {
            
            alert(error.response.data.message) 
            setLoading(false);
            
        });
        
        
        
    },[id]);

    
    
    const handeleInput = (ev) => {
      ev.persist();
      setReservation({...reservation, [ev.target.name]: ev.target.value  })
  }
  
    const handeleDateInput = (event) => {
      event.persist();
      totalePrice(event);
      setReservation({...reservation, [event.target.name]: event.target.value  })
  }
    
    
    if (isLoading) return <Loading />;
    

    function totalePrice(e) {
        e.preventDefault();

        const rentDuration =
      Date.parse(returnDate.current.value) -
      Date.parse(rentalDate.current.value);

      if (rentDuration <= 0) {
        swal("Attention","Vous devez louer pour au moin 1 jour ","warning");

        setTotale(offre.prix);
  
      } else if(rentDuration >= 0) {
          setTotale(offre.prix*rentDuration / 1000 / 60 / 60 / 24);
      }


    }

  const img = `http://localhost:8000${offre.photo1}`;

  const submitHandler = (e) =>{
    e.preventDefault();
    setLoading(true);   

    
    const data = {
    
        offre_id: offre.id,
        agence_id: offre.agence_id,
        voiture_id: offre.voiture_id,
        client_id: parseInt(localStorage.getItem('auth_id')),
        nom: reservation.nom,
        prenom: reservation.prenom,
        email: reservation.email,
        tel:  reservation.tel,
        personnes: reservation.personnes ,
        bagages: reservation.bagages,
        dateDebut: reservation.dateDebut,
        dateRetour: reservation.dateRetour,
        message: reservation.message,
        totale: totale,
        etat: "en Traitemant",
         
    }

    axios.post(`http://localhost:8000/api/reservations`, data)
        .then(res => {

            swal("Ajoutée","Votre demande est ajoutée et en cours de traitemant maintenant","success")
            navigate('/offres')
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
                        <Col lg='6'>
                            <img src={img} alt="" className="w-100" />
                        </Col>
                        <Col lg='6'>
                            <div className="car__info">
                                <h2 className="section__title">{offre.marque} {offre.modele}</h2>

                                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                                    <h6 className="rent__price">{offre.prix}.00  DH/jour</h6>

                                    <span className=" d-flex align-items-center gap-2"></span>
                                </div>

                                <p className="section__description">
                                    {offre.description}
                                </p>

                                <div className=" d-flex align-items-center" style={{ columnGap: "4rem"}}>
                                    <span className=" d-flex align-items-center gap-1 section__description">
                                        <i class="ri-building-2-fill icon"></i>{offre.marque}
                                    </span>
                                    <span className=" d-flex align-items-center gap-1 section__description">
                                        <i  class="ri-roadster-fill icon"></i>Modele-{offre.annee}
                                    </span>
                                    <span className=" d-flex align-items-center gap-1 section__description">
                                        <i class="ri-gas-station-fill icon"></i>{offre.carburant}
                                    </span>
                                </div>
                                <div className=" d-flex align-items-center" style={{ columnGap: "4rem"}}>
                                    <span className=" d-flex align-items-center gap-1 section__description">
                                        <i class="ri-settings-2-fill icon"></i>{offre.boitedevitesse}
                                    </span>
                                    <span className=" d-flex align-items-center gap-1 section__description">
                                        <i  class="ri-parking-box-fill icon"></i>{offre.portes} portes
                                    </span>
                                    <span className=" d-flex align-items-center gap-1 section__description">
                                        <i class="ri-home-office-fill icon"></i>Agence : {offre.agence_name}
                                    </span>
                                </div>
                            </div>
                        </Col>

                        <Col lg="7" className="mt-5">
                            <div className="booking-info mt-5">
                                <h4 className="mb-4 fw-bold">Formulaire de réservation</h4>
                                    <Form onSubmit={submitHandler}>
                                        <FormGroup className="reservation__form d-inline-block me-4 mb-4">
                                            <input type="text" name="nom" value={reservation.nom} onChange={handeleInput} placeholder="Nom"/>
                                            <span className="text-danger">{inputErrorList.nom}</span>
                                        </FormGroup>
                                        <FormGroup className="reservation__form d-inline-block ms-1 mb-4">
                                            <input type="text" name="prenom" value={reservation.prenom} onChange={handeleInput} placeholder="Prenom"/>
                                            <span className="text-danger">{inputErrorList.prenom}</span>
                                        </FormGroup>
                                        <FormGroup className="reservation__form d-inline-block me-4 mb-4">
                                            <input type="email" name="email" value={reservation.email} onChange={handeleInput} placeholder="Email"/>
                                            <span className="text-danger">{inputErrorList.email}</span>
                                        </FormGroup>
                                        <FormGroup className="reservation__form d-inline-block ms-1 mb-4">
                                            <input type="number" name="tel" value={reservation.tel} onChange={handeleInput} placeholder="Numero de téléphone"/>
                                            <span className="text-danger">{inputErrorList.tel}</span>
                                        </FormGroup>
                                        <h6>Info</h6>
                                        <FormGroup className="reservation__form d-inline-block me-4 mb-4">
                                            <select class="form-select form-select-lg" value={reservation.personnes} onChange={handeleInput} name="personnes" >
                                                <option selected>Nombre de personne</option>
                                                <option value={1}>une personne</option>
                                                <option value={2}>2 personnes</option>
                                                <option value={3}>3 personnes</option>
                                                <option value={4}>4 personnes</option>
                                                <option value={5}>+4 personnes</option>
                                            </select>
                                            <span className="text-danger">{inputErrorList.personnes}</span>
                                        </FormGroup>
                                        <FormGroup className="reservation__form d-inline-block me-4 mb-4">
                                            <select class="form-select form-select-lg" value={reservation.bagages} onChange={handeleInput} name="bagages" >
                                                <option selected>Nombre de bagages</option>
                                                <option value={1}>une bagage</option>
                                                <option value={2}>2 bagages</option>
                                                <option value={3}>3 bagages</option>
                                                <option value={4}>4 bagages</option>
                                                <option value={5}>+4 bagages</option>
                                            </select>
                                            <span className="text-danger">{inputErrorList.bagages}</span>
                                        </FormGroup>
                                        <h6>Date</h6>
                                        <FormGroup className="reservation__form date-aller d-inline-block me-4 mb-4">
                                            <input type="date" name="dateDebut" placeholder="Date de départ" value={reservation.dateDebut} onChange={handeleDateInput} ref={rentalDate} />
                                            <span className="text-danger">{inputErrorList.dateDebut}</span>
                                        </FormGroup>
                                        <FormGroup className="reservation__form date-retour d-inline-block ms-1 mb-4">
                                            <input type="date" name="dateRetour" placeholder="Date de retour" value={reservation.dateRetour} onChange={handeleDateInput} ref={returnDate} />
                                            <span className="text-danger">{inputErrorList.dateRetour}</span>
                                        </FormGroup>

                                        <FormGroup >
                                            <textarea rows={5} type='textarea' name="message" value={reservation.message} onChange={handeleInput} className='textarea' 
                                            placeholder="Vous avez des questions ou des demandes? 
                                            Ecrivez les et laissez nous savoir "></textarea>
                                            <span className="text-danger">{inputErrorList.message}</span>
                                        </FormGroup>
                                        
                                            <button className="reservation__button ms-5 mt-3" type="submit" w={"full"}>
                                            Résever maintenant
                                            </button>

                                    </Form> 
                            </div>
                        </Col>
                        <Col lg="5" className="mt-5 align-items-center">
                            <Center h={"100vh"} m={["5%", "10%", "12%", "13%", "0"]}>
                                
                                <VStack alignItems={"start"} spacing={"3"}>
                                <HStack w={"full"} justify={"space-between"}>
                                <Heading fontWeight={"400"} fontSize={"40"}>Total :</Heading>
                                     <Spacer />
                                     <Text
                                    color="gray.600"
                                    fontSize="20"
                                    fontWeight={"400"}
                                    
                                    >
                                    {totale}.00 
                                    </Text>
                                    <Text ml={2} fontSize="xl" fontWeight="semibold" color="gray.500">
                                    Dh
                                    </Text>
                                </HStack>
                                </VStack>    
                            </Center>
                        </Col>
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


export default Rent;
