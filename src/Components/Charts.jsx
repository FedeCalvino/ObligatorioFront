import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
    const [eventosPorCategoria, setEventosPorCategoria] = useState([]);

    const categoriasTipos = ['comida', 'paseo', 'pañal', 'sueño', 'biberon', 'juego'];

    useEffect(() => {

        console.log("eventoslist",eventoslist)
        if (categorias.length > 0 && eventoslist.length > 0) {
            // Crear un objeto para contar los eventos por cada categoría
            const eventosCount = [0,0,0,0,0,0]

            // Contar los eventos por cada categoría
            eventoslist.forEach(evento => {
                const categoria = categorias.find(cat => cat.id === evento.idCategoria);
                console.log("categoriacategoria",categoria)
                if(categoria){
                    switch(categoria.id){
                        case 31:
                            eventosCount[0]++;
                        break
                        case 32:
                            eventosCount[1]++;
                        break
                        case 33:
                            eventosCount[2]++;
                        break
                        case 34:
                            eventosCount[3]++;
                        break
                        case 35:
                            eventosCount[4]++;
                        break
                        case 36:
                            eventosCount[5]++;
                        break 
                    }
                }
            });

            console.log("Eventos por eventosCount:", eventosCount);
            setEventosPorCategoria(eventosCount);
        }
    },[eventoslist]);


    return (
        <Bar 
            options={options} 
            data={{
                labels: categoriasTipos,
                datasets: [
                    {
                        label: 'Eventos',
                        data: eventosPorCategoria,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
            }} 
        />
    );
};