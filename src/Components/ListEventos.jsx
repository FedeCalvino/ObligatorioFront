import React, { useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '../css/Listeventos.css'; // Asegúrate de que la ruta sea correcta
import { deleteEvent } from '../Features/eventosSlice';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';   

export const ListEventos = () => {
    const url = `https://babytracker.develotion.com//`;
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const dispatch = useDispatch();
    const eventoslist = useSelector(state => state.eventos.eventos);
    const categorias = useSelector((state) => state.categorias.categorias);
    const toastTopCenter = useRef(null);
    
    const eventosConCategorias = eventoslist.map(event => {
        console.log(event)
        const categoria = categorias.find(cat => cat.id === event.idCategoria);
        if (!categoria) {
            console.warn(`Categoría con ID ${event.idCategoria} no encontrada para el evento ${event.detalle}`);
        }

        return {
            ...event,
            categoriaNombre: categoria ? categoria.tipo : 'Sin Categoría' // Adjust according to your category property
        };
    });


    const getTodayDate = () => {
        let today = new Date();
        today.setHours(today.getHours() - 3); 
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    };

    const todayDate = getTodayDate();

    const eventosDelDia = eventosConCategorias.filter(evento => evento.fecha.split(' ')[0] === todayDate);
    const eventosAnteriores = eventosConCategorias.filter(evento => evento.fecha.split(' ')[0] !== todayDate);


    const DeleteEvent = async (IdEvent) => {
        
        const urlEventdel = "eventos.php?idEvento="
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'apikey': user.apiKey, // Añade tu apikey
                'iduser': user.id, // Añade el iduser
            }
        };
        try {
            const response = await fetch(url + urlEventdel+IdEvent, requestOptions);
    
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            toastTopCenter.current.show({ severity: "success", summary: "evento eliminado", detail: "", life: 3000 });
        } catch (error) {
            console.error('FetchCategorias error:', error);
        }
    };

    const handleDelete = (EventoId) => {
        console.log("eventosDelDia",eventosDelDia)
        dispatch(deleteEvent(EventoId))
        DeleteEvent(EventoId)
    };


    

    return (
        <> 
        <div style={{width:"50px"}} className="card flex justify-content-center">
                <Toast style={{width:"50px",height:"30px"}} ref={toastTopCenter} position="top-center" />
        </div>
        <div className="event-tables-container">     
            <div className="event-table-container">
                <h3>Eventos del Día</h3>
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Detalle</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventosDelDia.length > 0 ? (
                            eventosDelDia.map((evento, index) => (
                                <tr key={index}>
                                    <td>{evento.categoriaNombre}</td>
                                    <td>{evento.detalle}</td>
                                    <td>{evento.fecha}</td>
                                    <td>
                                        <button onClick={() => handleDelete(evento.id)} className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay eventos del día</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="event-table-container">
                <h3>Eventos Anteriores</h3>
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Detalle</th>
                            <th>Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventosAnteriores.length > 0 ? (
                            eventosAnteriores.map((evento, index) => (
                                <tr key={index}>
                                    <td>{evento.categoriaNombre}</td>
                                    <td>{evento.detalle}</td>
                                    <td>{evento.fecha}</td>
                                    <td>
                                        <button onClick={() => handleDelete(evento.id)} className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay eventos anteriores</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};