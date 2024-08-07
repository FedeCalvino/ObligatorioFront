import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { CrearEvento } from './CrearEvento';
import { useDispatch } from 'react-redux';
import { addEvent,deleteEvent } from "../Features/eventosSlice";
import { ListEventos } from './ListEventos';

export const Home = ({LogOut,UserLs}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const url = `https://babytracker.develotion.com//`;
    const [Categorias,setCategorias] = useState([])
    const [CategoriaSelecc,setCategoriaSelecc] = useState([])
    const [dateTime, setDateTime] = useState('');
    const [DetalleEevento, setDetalleEevento] = useState('');
    
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
            setCategorias(result.categorias);
        } catch (error) {
            console.error('FetchCategorias error:', error);
        }
    };
    const crearEvento = async (Evento)=>{
        const urlEvent = "eventos.php"
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': UserLs.apiKey, // Añade tu apikey
                'iduser': UserLs.id, // Añade el iduser
            }
        };
        requestOptions.body = JSON.stringify(Evento);
        try {
            const response = await fetch(url + urlEvent, requestOptions);
    
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }

            dispatch(addEvent(Evento));

            const result = await response.json();
            console.log("Evento",result);
        } catch (error) {
            console.error('FetchCategorias error:', error);
        }
    }
    const EliminarEvento = (index) => {
        dispatch(deleteEvent(index));
    };


    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
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
    <>
        <button onClick={()=>LogOut()}>log out</button>
        <CrearEvento Categorias={Categorias} callBackCrearEvent={crearEvento} Usu={UserLs}/>
        <ListEventos callBackDeleteEv={EliminarEvento}/>
    </>
  )
}
