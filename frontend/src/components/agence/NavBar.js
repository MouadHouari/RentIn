import axios from "axios";
import React, { useEffect, useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "./Loading";



function NavBar(){

    const id = localStorage.getItem('auth_id');
    // const[Loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const[user, setProfile] = useState({});
    const[agence,setAgence] = useState(false)

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/user/${id}`)
        .then((res) => {
            setProfile(res.data.user[0]);
            if(res.data.user.agence == 1)
            setAgence(true);
          }).catch(function(error) {
            // agence=0;
              
          });
          
          
      },[id]);

    //   if (Loading) return <Loading />;

    const logoutSubmit = (e) =>{
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if(res.data.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_id');

                    const email = localStorage.getItem('email');
                    const password = localStorage.getItem('password');
                    const AuthHeader = `Basic ${btoa(`${email}:${password}`)}`;
                    const xhr = new XMLHttpRequest();
                    const url = 'http://localhost:8082/api/session';
                  
                    xhr.open('DELETE', url);
                    
                    xhr.setRequestHeader('Authorization', AuthHeader);
                  
                    xhr.onreadystatechange = function () {

                      if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 204) {
                            
                          localStorage.removeItem('email');
                          localStorage.removeItem('password');
                          localStorage.removeItem('tokenData');
                          console.log('DELETE request successful');
                        } else {
                          console.error('Error making DELETE request:', xhr.status, xhr.statusText);
                          // Handle the error as needed
                        }
                      }
                    };
                  
                    xhr.send();

                    
                    swal("Au revoir",res.data.message,"success");
                    navigate('/');
                
                  

                
            }
        })
    }





    var AuthButtons = '';
    if(!localStorage.getItem('auth_token')){
        AuthButtons = (
            // <ul className="navabar-nav">
            
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>

            /* </ul>  */
        )
    }
    else{
        if(agence){
            AuthButtons = (
                <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/voitures">Mes voitures</Link>
                    </li>
    
                    <li className="nav-item">
                    <Link className="nav-link" to="/mesoffres">Mes offres</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="nav-link btn btn-light btn-sm text-red float-right" onClick={logoutSubmit}>Logout</button>
                    </li>
                </>
            )
        }
        else{
            if(localStorage.getItem('auth_token') && (!agence)){

                AuthButtons = (
                    <>
                    
                    <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="nav-link btn btn-light btn-sm text-red float-right" onClick={logoutSubmit}>Logout</button>
                    </li>
                </>
            )
            }
        }
        
    }

    return(
                
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container">
            <Link className="navbar-brand" to="/">RentIn</Link>
            
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" to="/">Home {agence}</Link>
                </li>
                
                <li className="nav-item">
                <Link className="nav-link" to="/offres">Offres</Link>
                </li>

                

            </ul>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <Link className="nav-link active" to="/">Home {agence}</Link>
                </li>
                
                <li className="nav-item">
                <Link className="nav-link" to="/offres">Offres</Link>
                </li> */}

                
                {AuthButtons}
                

            </ul>
            
            </div>
        </div>
        </nav>
     );
}

export default NavBar;