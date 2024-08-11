import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/Listeventos.css'; // Asegúrate de que la ruta sea correcta

export const ListEventos = () => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const eventoslist = useSelector(state => state.eventos.eventos);
    const categorias = useSelector((state) => state.categorias.categorias);

    const eventosConCategorias = eventoslist.map(event => {
        const categoria = categorias.find(cat => cat.id === event.idCategoria);
        return {
            ...event,
            categoriaNombre: categoria ? categoria.tipo : 'Sin Categoría' // Adjust according to your category property
        };
    });


    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    };

    const todayDate = getTodayDate();
    const eventosDelDia = eventosConCategorias.filter(evento => evento.fecha.split(' ')[0] === todayDate);
    const eventosAnteriores = eventosConCategorias.filter(evento => evento.fecha.split(' ')[0] !== todayDate);

    const handleDelete = (index, isToday) => {
        // Función para eliminar eventos (deberías implementar esta función)
        // Aquí deberías manejar la eliminación del evento
    };

    return (
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
                                        <button onClick={() => handleDelete(index, true)} className="btn btn-danger">Eliminar</button>
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
                                        <button onClick={() => handleDelete(index, false)} className="btn btn-danger">Eliminar</button>
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
    );
};