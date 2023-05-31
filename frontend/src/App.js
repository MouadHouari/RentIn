import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";



import Home from "./pages/Home";
import MyRouter from "./router/index.js";
import NavBar from "./components/agence/NavBar";
import axios from "axios";
import Footer from "./layouts/agence/Footer";

axios.defaults.withCredentials = true;
axios.defaults.baseURL="http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});



function App(){
  return (
    <div>
        < NavBar /> 
        <MyRouter />
        <Footer />
    </div>

  );
}

export default App;
