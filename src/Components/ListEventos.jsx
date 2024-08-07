import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const ListEventos = ({callBackDeleteEv}) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const eventoslist = useSelector(state => state.eventos.eventos);

    const FetchEventosUser = async () => {
        if (!user) return;

        const urlEvent = `https://babytracker.develotion.com//eventos.php?idUsuario=${user.id}`; // Corrected URL syntax
    console.log(urlEvent)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': user.apiKey,
                'iduser': user.id,
            }
        };

        try {
            const response = await fetch(urlEvent, requestOptions);

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Eventos fetch result:", result);

            // Dispatch action to add fetched eventos to the Redux store
           // result.eventos.forEach(event => dispatch(addEvent(event)));

        } catch (error) {
            console.error('FetchEventosUser error:', error);
        }
    };
 

    useEffect(() => {
        if (user) {
            FetchEventosUser();
        }
    }, [user]);

    return (
        <>
        <button onClick={()=>{FetchEventosUser()}}>get eventos</button>
            <ul>
                {eventoslist.map((evento, index) => (
                    <li key={index}>
                        <div>
                            <div>IdCategoria: {evento.IdCategoria}</div>
                            <div>IdUsuario: {evento.IdUsuario}</div>
                            <div>Detalle: {evento.detalle}</div>
                            <div>Fecha: {evento.fecha}</div>
                        </div>
                        <div>
                            <button onClick={()=>{callBackDeleteEv(index)}}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            </>
    );
};