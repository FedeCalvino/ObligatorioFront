import React, { useState,useEffect } from 'react'
import { RegistrarLoggin } from './RegistrarLoggin';
import { Provider } from 'react-redux';
import {Store } from './Store.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Home.jsx';
import { NotFound } from './NotFound.jsx';

export const App = () => {
    const url = `https://babytracker.develotion.com//`;

    const [User, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    console.log("usuario",User)

    const DeleteUser = () => {
        localStorage.removeItem('user');
        setUser(null); // Opcional: actualiza el estado local si es necesario
    };

    const CrearUsuario = async (UsuarioCreado)=>{

        const UrlUsuario = "usuarios.php";

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        requestOptions.body = JSON.stringify(UsuarioCreado);

        const urlfetch= url+UrlUsuario;
        const response = await fetch(urlfetch, requestOptions);

        const result = await response.json();

        if(result.codigo==200){
            setUser({
                id:result.id,
                apiKey:result.apiKey
            })
        }
        console.log(User)
        
    }

    const LoginUsuario = async (UsuarioLogg)=>{

        console.log(UsuarioLogg)
        

        const UrlUsuario = "login.php";

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        requestOptions.body = JSON.stringify(UsuarioLogg);

        const urlfetch= url+UrlUsuario;

        console.log(urlfetch)
        
        const response = await fetch(urlfetch, requestOptions);

        const result = await response.json();

       if(result.codigo==200){
            setUser({
                id:result.id,
                apiKey:result.apiKey
            })
        }else{
            //alerta log mal
        }
        console.log(User)
    }


    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(User));
    }, [User]);



  return (
    <Provider store={Store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegistrarLoggin UserLs={User} callBackRegistro={CrearUsuario} callBackLoggin={LoginUsuario} />}/>
                <Route path="/Home" element={<Home LogOut={DeleteUser}  UserLs={User}/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>   
        </BrowserRouter>
    </Provider>
  )
}
