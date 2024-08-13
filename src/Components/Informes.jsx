import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../css/Informes.css"
export const Informes = () => {
  const eventos = useSelector(state => state.eventos.eventos);

  // Filtra los eventos para obtener solo los de x categoria
  const eventosBiberones = eventos.filter(evento => evento.idCategoria === 35);
  const eventosPaniales = eventos.filter(evento => evento.idCategoria === 33);

  const getTodayDate = () => {
      const today = new Date();
      today.setHours(today.getHours() - 3); 
      return today.toISOString().split('T')[0];
  };

  const todayDate = getTodayDate();
  // Filtra los eventos del día por categoria
  const biberonesDelDia = eventosBiberones.filter(evento => evento.fecha.split(' ')[0] === todayDate);
  const panialesDelDia = eventosPaniales.filter(evento => evento.fecha.split(' ')[0] === todayDate);

  //  total x categoria
  const totalBiberones = biberonesDelDia.length;
  const totalPaniales = panialesDelDia.length;

  // Calcula el tiempo transcurrido desde el último biberón
  const getTimeSinceLastBiberon = () => {
      if (totalBiberones === 0) {
            return 'No hay biberones hoy';
        }
          // Ordena los biberones del día por fecha (más reciente primero)
          const ultimoBiberon = biberonesDelDia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
          const ultimaFecha = new Date(ultimoBiberon.fecha);
          const ahora = new Date();
          const tiempoTranscurrido = ahora - ultimaFecha;
  
          // Convierte el tiempo transcurrido a horas y minutos
          const horas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
          const minutos = Math.floor((tiempoTranscurrido % (1000 * 60 * 60)) / (1000 * 60));
  
          return `${horas} horas y ${minutos} minutos`;
        };
  // Calcula el tiempo transcurrido desde el último panial
  const getTimeSinceLastPanal = () => {
    if (totalPaniales=== 0) {
      return 'No hay cambios de pañales hoy';
    }
    // Ordena los cambios de pañales del día por fecha (más reciente primero)
    const ultimoPanal = panialesDelDia.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
    const ultimaFecha = new Date(ultimoPanal.fecha);
    const ahora = new Date();
    const tiempoTranscurrido = ahora - ultimaFecha;

    // Convierte el tiempo transcurrido a horas y minutos
    const horas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoTranscurrido % (1000 * 60 * 60)) / (1000 * 60));

    return `${horas} horas y ${minutos} minutos`;
      };
      return (
        <div className='containerInform'>
            <table className="informes-table">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Total del Día</th>
                        <th>Último Evento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Biberones</td>
                        <td>{totalBiberones}</td>
                        <td>{getTimeSinceLastBiberon()}</td>
                    </tr>
                    <tr>
                        <td>Pañales</td>
                        <td>{totalPaniales}</td>
                        <td>{getTimeSinceLastPanal()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

  };
  


