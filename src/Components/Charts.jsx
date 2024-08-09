import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Pronóstico para Montevideo',
        },
    },
};


export const Charts = () => {
    const eventoslist = useSelector(state => state.eventos.eventos);
    const categorias = useSelector(state => state.categorias.categorias);
    const [categoriasTipos, setCategoriasTipos] = useState([]);

useEffect(()=>{
    const tipos = categorias.map(cat => cat.tipo);
    setCategoriasTipos(tipos);
    //orden
    //comida,paseo,pañal,sueño,biberon,juegos
},[])

  return (
    <Bar options={options} data={{
        labels:categoriasTipos,
        datasets: [
            {
                label: 'Máximas',
                data: [4, 5, 6, 7, 3, 4, 5],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }} />
  )
}
