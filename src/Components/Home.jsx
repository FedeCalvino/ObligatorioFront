import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = ({LogOut,UserLs}) => {
    const navigate = useNavigate()
    const url = `https://babytracker.develotion.com//`;
    const [Categorias,setCategorias] = useState("")
    
    console.log(UserLs)
    const FetchCategorias = async () => {
        console.log(UserLs.apiKey)
        const urlCat = "categorias.php";
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': UserLs.apiKey, // Añade tu apikey
                'iduser': UserLs.id, // Añade el iduser
            }
        };
    
        try {
            const response = await fetch(url + urlCat, requestOptions);
    
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
    
            const result = await response.json();
            console.log(result.categorias);
            setCategorias(result);
        } catch (error) {
            console.error('FetchCategorias error:', error);
        }
    };

    useEffect(()=>{
        FetchCategorias()
        if(!UserLs){
            navigate("/")
        } 
    },[])
    if(!UserLs){
        navigate("/")
    } 
  return (
    <button onClick={()=>LogOut()}>log out</button>
  )
}
