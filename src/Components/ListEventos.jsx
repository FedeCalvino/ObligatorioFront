import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../css//Listeventos.css';

export const ListEventos = () => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const eventoslist = useSelector(state => state.eventos.eventos);

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    };

    const todayDate = getTodayDate();
    const eventosDelDia =  eventoslist.filter(evento => evento.fecha.split(' ')[0] === todayDate);
    const eventosAnteriores = eventoslist.filter(evento => evento.fecha.split(' ')[0] !== todayDate);



    return (
        <>
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Eventos del Día</th>
                            <th></th>
                            <th>Eventos Anteriores</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Math.max(eventosDelDia.length, eventosAnteriores.length) > 0 && (
                            Array.from({ length: Math.max(eventosDelDia.length, eventosAnteriores.length) }).map((_, index) => (
                                <tr key={index}>
                                    <td>
                                        {eventosDelDia[index] ? (
                                            <div>
                                                <div><strong>IdCategoria:</strong> {eventosDelDia[index].idCategoria}</div>
                                                <div><strong>NombreCategoria:</strong> {eventosDelDia[index].categoriaNombre}</div>
                                                <div><strong>IdUsuario:</strong> {eventosDelDia[index].idUsuario}</div>
                                                <div><strong>Detalle:</strong> {eventosDelDia[index].detalle}</div>
                                                <div><strong>Fecha:</strong> {eventosDelDia[index].fecha}</div>
                                            </div>
                                        ) : (
                                            <div>No hay evento</div>
                                        )}
                                    </td>
                                    <td>
                                        {eventosDelDia[index] && (
                                            <button onClick={() => handleDelete(index, true)} className="btn btn-danger">Eliminar</button>
                                        )}
                                    </td>
                                    <td>
                                        {eventosAnteriores[index] ? (
                                            <div>
                                                <div><strong>IdCategoria:</strong> {eventosAnteriores[index].idCategoria}</div>
                                                <div><strong>NombreCategoria:</strong> {eventosAnteriores[index].categoriaNombre}</div>
                                                <div><strong>IdUsuario:</strong> {eventosAnteriores[index].idUsuario}</div>
                                                <div><strong>Detalle:</strong> {eventosAnteriores[index].detalle}</div>
                                                <div><strong>Fecha:</strong> {eventosAnteriores[index].fecha}</div>
                                            </div>
                                        ) : (
                                            <div>No hay evento</div>
                                        )}
                                    </td>
                                    <td>
                                        {eventosAnteriores[index] && (
                                            <button onClick={() => handleDelete(index, false)} className="btn btn-danger">Eliminar</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            
        </>
    );
};