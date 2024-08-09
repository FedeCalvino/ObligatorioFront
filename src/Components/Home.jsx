import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CrearEvento } from './CrearEvento';
import { useDispatch } from 'react-redux';
import { addEvent } from "../Features/eventosSlice";
import { ListEventos } from './ListEventos';
import {setCategorias} from "../Features/categoriaSlice";
import {Charts} from './Charts';

export const Home = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const url = `https://babytracker.develotion.com//`;
    

    const [User, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const FetchCategorias = async () => {
        const urlCat = "categorias.php";
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': User.apiKey, // Añade tu apikey
                'iduser': User.id, // Añade el iduser
            }
        };
    fetch(url+urlCat,requestOptions)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
         }) .then(result => {
        console.log(result.categorias);
        dispatch(setCategorias(result.categorias));
        })
        .catch(error => {
        console.error('FetchCategorias error:', error);
        }); 
    };
    
    const DeleteUser = () => {
        localStorage.removeItem('user');
        setUser(null); // Opcional: actualiza el estado local si es necesario
    };


    useEffect(()=>{
        FetchCategorias()
        if(!User){
            navigate("/")
        } 
    },[])

    
    if(!User){
        navigate("/")
    } 

    const FetchEventosUser = async () => {
        const urlEvent = `https://babytracker.develotion.com//eventos.php?idUsuario=${User.id}`; // Corrected URL syntax
        console.log(urlEvent)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': User.apiKey,
                'iduser': User.id,
            }
        };

        try {
            const response = await fetch(urlEvent, requestOptions);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Eventos fetch result:", result);

            result.eventos.forEach(event => dispatch(addEvent(event)));

        } catch (error) {
            console.error('FetchEventosUser error:', error);
        }
    };
 

    useEffect(() => {
        if (User) {
            FetchEventosUser();
        }
    }, [User]);


  return (
    <>
        <button onClick={()=>DeleteUser()}>log out</button>
        <CrearEvento/>
        <ListEventos/>
        <Charts/>
    </>
  )
}
