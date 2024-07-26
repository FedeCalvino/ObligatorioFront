import React, { useState,useEffect } from 'react'
import { RegistrarLoggin } from './RegistrarLoggin';

export const App = () => {

    const url = `https://babytracker.develotion.com/`;

    const [User, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const CrearUsuario = async (UsuarioCreado)=>{


        console.log(UsuarioCreado)

        const UrlUsuario = "usuarios.php";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        requestOptions.body = JSON.stringify(UsuarioCreado);

        const urlfetch= url+UrlUsuario;
        console.log(urlfetch)
        
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
        }

        console.log(User)
        
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(User));
    }, [User]);


  return (
    <>
        <RegistrarLoggin callBackRegistro={CrearUsuario} callBackLoggin={LoginUsuario} />
    </>
  )
}
