import React, { useState, useEffect } from "react";
import "../css/Timerbiberon.css";
import { useSelector } from 'react-redux';

export const TimerBiberon = () => {
  const [tiempoRestante, setTiempoRestante] = useState("");
  const [colorTexto, setColorTexto] = useState("green");
  const eventos = useSelector(state => state.eventos.eventos);
  const eventosBiberones = eventos.filter((evento) => evento.idCategoria === 35);

  const calcularTiempoRestante = () => {
    if (eventosBiberones.length === 0) {
      setTiempoRestante("No hay biberones");
      setColorTexto("gray");
      return;
    }

    const ultimoBiberon = eventosBiberones.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    )[0];

    const ultimaIngesta = new Date(ultimoBiberon.fecha);
    const ahora = new Date();
    const proximoBiberon = new Date(ultimaIngesta.getTime() + 4 * 60 * 60 * 1000); // Suma 4 horas
    const diferencia = proximoBiberon - ahora;

    if (diferencia > 0) {
      const horas = Math.floor(diferencia / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      setTiempoRestante(`Faltan ${horas}h ${minutos}m para el proximo biberon`);
      setColorTexto("green");
    } else {
      setTiempoRestante("¡Es hora de un nuevo biberón!");
      setColorTexto("red");
    }
  };

  useEffect(() => {
    calcularTiempoRestante();
  }, [eventosBiberones]);

  return <div style={{ color: colorTexto }}>{tiempoRestante}</div>;
};