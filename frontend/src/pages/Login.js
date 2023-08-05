
import React, { useState } from "react"
import axios from 'axios'; 
import swal from 'sweetalert';
import { useNavigate} from 'react-router-dom';
import { FormGroup } from "reactstrap";


function Login() {

  const[loginInput, setLogin]= useState({
    
    email: '',
    password: '',
    error_list: [],
  });
  const [isChecked, setIsChecked] = useState(false);

  const loginhandleInput =  (e) => {
    e.persist();
    setLogin({...loginInput, [e.target.name]: e.target.value })
  }
  
  const traccar = axios.create({
    baseURL: 'https://localhost:8082/', 
  });
//--------LoginSubmit---------------------//

  const loginSubmit = (e) =>{
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }
  
    const xhr = new XMLHttpRequest();
      const url = 'http://localhost:8082/api/session';
      const params = `email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`;
  
    axios.get(`/sanctum/csrf-cookie`).then(response => {
      axios.post(`/api/login`,data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_id', res.data.id);
          
          
          //-----Ouvrir session dans traccar api-------//
          xhr.open('POST', url);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                // Handle the response
                console.log(xhr.responseText);

                localStorage.setItem('email', data.email);
                localStorage.setItem('password', data.password);

                }else {
                  // Handle errors
                  console.error(xhr.status, xhr.statusText);
                }

              }
            };
            xhr.send(params);
          //-------------------------------------------------//
          
          swal("Bienvenue",res.data.message,"success");
          navigate('/');
        }
        else if(res.data.status === 401){
          swal("Warning",res.data.message,"warning");
        }
        else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors})
        }

      });
    });
  }

  //---------register functions------------//


  let [authMode, setAuthMode] = useState("signin")

  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const[registerInput, setRegister]= useState({
    name: '',
    email: '',
    tel: '',
    agence: '',
    agence_name: '',
    password: '',
    c_password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({...registerInput, [e.target.name]: e.target.value })
  }

  const handleAgenceInput = (e) => {
    e.persist();
    setIsChecked(!isChecked);
    setRegister({...registerInput, [e.target.name]: e.target.value })
}

  const createUser = () => {
    const email = registerInput.email;
    const name = registerInput.name;
    const password = registerInput.password;
    const username = "houarimouad@gmail.com";
    const pass = "mouad@123";
    const AuthHeader = `Basic ${btoa(`${username}:${pass}`)}`;
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:8082/api/users';
    const data = JSON.stringify({
      name: name,
      email: email,
      password: password,
      disabled: false,
      deviceLimit: -1,
      fixedEmail: true
    });

    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', AuthHeader);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log('POST request successful:', response);
          
        } else {
          console.error('Error making POST request:', xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send(data);
  }

  const registerSubmit = () =>{
    if(isChecked){
      var agence=1;
    }else{
      var agence=0;
    }
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      tel: registerInput.tel,
      agence: agence,
      agence_name: registerInput.agence_name,
      password: registerInput.password,
      c_password: registerInput.c_password,
    }

    
    axios.get(`/sanctum/csrf-cookie`).then(response => {
      axios.post(`/api/register`,data).then(res => {
        if(res.data.status === 200){
          swal("Success",res.data.message,"success");
          setAuthMode("signin");
          navigate('/login');
        }
        else{
          setRegister({ ...registerInput, error_list: res.data.validation_errors})
        }

      });
    });
  }

  const register = (e) =>{
    e.preventDefault();
    if(isChecked){
      createUser();
    }
    registerSubmit();
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={loginSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Se connecter</h3>
            <div className="text-center">
              Pas encore inscrit?{" "}
              <button className="btn btn-outline-primary" onClick={changeAuthMode}>
                S'inscrire
              </button>
            </div>
            <div className="form-group mt-3">
              <label>Adresse e-mail</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Entrer votre email"
                value={loginInput.email}
                onChange={loginhandleInput}
              />
              <span className="text-danger">{loginInput.error_list.email}</span>
            </div>
            
            <div className="form-group mt-3">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Entrer votre mot de passe"
                value={loginInput.password}
                onChange={loginhandleInput}
              />
              <span className="text-danger">{loginInput.error_list.password}</span>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Se connecter
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }


  return (
    <div className="Auth-form-container">
      <form className="Auth-form"onSubmit={register} >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">S'inscrire</h3>
          <div className="text-center">
            Déja inscrit?{" "}
            <span className="btn btn-outline-primary" onClick={changeAuthMode}>
              Se connecter
            </span>
            </div>
            
          <FormGroup className="form-group mt-3">
            <label>Nom complet</label>
            <input
              type=""
              name="name"
              className="form-control mt-1 d-inline-block me-4 "
              placeholder="Nom et Prénom"
             value={registerInput.name}
              onChange={handleInput}
              
            />
            <span className="text-danger">{registerInput.error_list.name}</span>
          </FormGroup>
          <FormGroup className="form-group d-inline-block me-2 ms-1">
            <label>Telephone</label>
            <input
              type="number"
              name="tel"
              className="form-control mt-1"
              placeholder="Numéro de telephone"
             value={registerInput.tel}
              onChange={handleInput}
              
            />
            <span className="text-danger">{registerInput.error_list.tel}</span>
          </FormGroup>
          {isChecked && (
            <FormGroup className="form-group d-inline-block ">
            <label>Agence</label>
            <input
              type="text"
              name="agence_name"
              className="form-control mt-1 d-inline-block  "
              placeholder="Nom de l'agence"
             value={registerInput.agence_name}
              onChange={handleInput}
              
            />
            <span className="text-danger">{registerInput.error_list.agence_name}</span>
          </FormGroup>
          )}
          
          <br></br>
          <FormGroup className="form-group d-inline-block  ms-1">
            <input
              type="checkbox"
              name="agence"
              className="me-2"
             value={registerInput.agence}
             onChange={handleAgenceInput}
             defaultValue={0}
             
             />
             <label>Vous étes une agence?</label> 
            <span className="text-danger">{registerInput.error_list.agence}</span>
          </FormGroup>
          
          <div className="form-group mt-3">
            <label>Adresse e-mail</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Adresse email"
              onChange={handleInput}
              value={registerInput.email}
            />
            <span className="text-danger">{registerInput.error_list.email}</span>
          </div>
          <div className="form-group mt-3">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Mot de passe"
              onChange={handleInput}
              value={registerInput.password}
              
            />
            <span className="text-danger">{registerInput.error_list.password}</span>
          </div>
          <div className="form-group mt-3">
            
            <input
              type="password"
              name="c_password"
              className="form-control mt-1"
              placeholder="Confirmer"
              onChange={handleInput}
              value={registerInput.c_password}
              
            />
            <span className="text-danger">{registerInput.error_list.c_password}</span>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Créer compte
            </button>
          </div>
          
        </div>
      </form>
    </div>
  )
}

 export default Login;

