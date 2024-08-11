import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export const Informes = () => {
  const eventos = useSelector(state => state.eventos.eventos);

  // Filtra los eventos para obtener solo los biberones de la categoría 35
  const eventosBiberones = eventos.filter(evento => evento.idCategoria === 35);

  const getTodayDate = () => {
      const today = new Date();
      return today.toISOString().split('T')[0];
  };

  const todayDate = getTodayDate();
  // Filtra los biberones del día
  const biberonesDelDia = eventosBiberones.filter(evento => evento.fecha.split(' ')[0] === todayDate);

  //  total de biberones
  const totalBiberones = biberonesDelDia.length;

  // Calcula el tiempo transcurrido desde el último biberón
  const getTimeSinceLastBiberon = () => {
  if (biberonesDelDia.length === 0) {
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
        return (
          <div>
              <h2>Informes de Biberones</h2>
              <div>
                  <h3>Total de Biberones del Día:</h3>
                  <p>{totalBiberones}</p>
              </div>
              <div>
                  <h3>Tiempo Transcurrido Desde el Último Biberón:</h3>
                  <p>{getTimeSinceLastBiberon()}</p>
              </div>
          </div>
      );
  };
  


