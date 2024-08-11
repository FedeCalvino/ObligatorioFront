import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/Chart.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
            text: 'Total Eventos por Categoria',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1, // Incrementos de 1 en el eje Y
            }
        }
    }
};
export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Eventos por dia de semana',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1, // Incrementos de 1 en el eje Y
            }
        }
    }
};
export const Charts = () => {
  const eventoslist = useSelector((state) => state.eventos.eventos);
  const categorias = useSelector((state) => state.categorias.categorias);
  const [eventosPorCategoria, setEventosPorCategoria] = useState([]);
  const Eventoscomidas = eventoslist.filter(
    (evento) => evento.idCategoria === 31
  );
  const [ComidasPorDiaList, setComidasPorDiaList] = useState([]);
  const categoriasTipos = [
    "comida",
    "paseo",
    "pañal",
    "sueño",
    "biberon",
    "juego",
  ];
  const DiasSemana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  useEffect(() => {
    if (categorias.length > 0 && eventoslist.length > 0) {
      setComidasPorDia();
      setEventosPorTipo();
    }
  }, [eventoslist]);

  const setComidasPorDia = () => {
    const comidasPorDia = [0, 0, 0, 0, 0, 0, 0];

    // Filtrar eventos de comida
    const eventosComidas = eventoslist.filter(
      (evento) => evento.idCategoria === 31
    );

    // Contar comidas por día
    eventosComidas.forEach((evento) => {
      const fechaEvento = new Date(evento.fecha);
      let diaSemana = fechaEvento.getDay();
      diaSemana = diaSemana === 0 ? 6 : diaSemana - 1;
      // 0 es domingo, 1 es lunes, etc.

      switch (diaSemana) {
        case 0:
          comidasPorDia[0]++;
          break;
        case 1:
          comidasPorDia[1]++;
          break;
        case 2:
          comidasPorDia[2]++;
          break;
        case 3:
          comidasPorDia[3]++;
          break;
        case 4:
          comidasPorDia[4]++;
          break;
        case 5:
          comidasPorDia[5]++;
          break;
        case 6:
          comidasPorDia[6]++;
          break;
        default:
          break;
      }
    });

    // Convertir el objeto a un array en el orden correcto de los días

    // Actualizar el estado
    setComidasPorDiaList(comidasPorDia);
  };

  const setEventosPorTipo = () => {
    console.log("eventoslist", eventoslist);

    // Crear un objeto para contar los eventos por cada categoría
    const eventosCount = [0, 0, 0, 0, 0, 0];

    // Contar los eventos por cada categoría
    eventoslist.forEach((evento) => {
      const categoria = categorias.find((cat) => cat.id === evento.idCategoria);
      console.log("categoriacategoria", categoria);
      if (categoria) {
        switch (categoria.id) {
          case 31:
            eventosCount[0]++;
            break;
          case 32:
            eventosCount[1]++;
            break;
          case 33:
            eventosCount[2]++;
            break;
          case 34:
            eventosCount[3]++;
            break;
          case 35:
            eventosCount[4]++;
            break;
          case 36:
            eventosCount[5]++;
            break;
        }
      }
    });

    console.log("Eventos por eventosCount:", eventosCount);
    setEventosPorCategoria(eventosCount);
  };

  return (
    <div className="chart-container">
    <div className="bar-chart">
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
    </div>

    <div className="bar-chart">
        <Bar 
            options={options2} 
            data={{
                labels: DiasSemana,
                datasets: [
                    {
                        label: 'Comidas',
                        data: ComidasPorDiaList,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
            }} 
        />
    </div>
</div>
  );
};
