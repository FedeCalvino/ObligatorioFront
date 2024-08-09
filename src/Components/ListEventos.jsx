import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const ListEventos = () => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const categorias = useSelector(state => state.categorias.categorias);
    const eventoslist = useSelector(state => state.eventos.eventos);



    return (
        <>
        <button onClick={()=>{FetchEventosUser()}}>get eventos</button>
            <ul>
                {eventoslist.map((evento, index) => (
                    <li key={index}>
                        <div>
                            <div>IdCategoria: {evento.IdCategoria}</div>
                            <div>NombreCategoria: {evento.CategoriaNombre}</div>
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