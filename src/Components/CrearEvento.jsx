import React, { useState,useRef } from 'react';
import { Form } from 'react-bootstrap';
import "../css/CrearEvento.css"
import { addEvent } from "../Features/eventosSlice";
import { useDispatch,useSelector } from 'react-redux';
import { selectCategorias } from '../Features/categoriaSlice'; 
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';          

export const CrearEvento = () => {

    const toastTopCenter = useRef(null);
    const url = `https://babytracker.develotion.com//`;
    const [CategoriaSelecc, setCategoriaSelecc] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [DetalleEvento, setDetalleEvento] = useState('');
    const dispatch = useDispatch();

    const [User, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleDateTimeChange = (event) => {
        const formattedDateTime = event.target.value.replace('T', ' ');
        setDateTime(formattedDateTime);
        console.log(formattedDateTime)
    };

    const categorias = useSelector(state => state.categorias.categorias);


    const AddEvent = async () => {
        const now = new Date();
        now.setHours(now.getHours() - 3); //esto para arreglar la zona horaria a Uy 
        const selectedDateTime = new Date(dateTime);

        if (selectedDateTime > now ) {
            toastTopCenter.current.show({ severity: "error", summary: "La fecha no puede ser futura", detail: "", life: 3000 });
            return;
        }
        if (!CategoriaSelecc) {
            toastTopCenter.current.show({ severity: "error", summary: "debe seleccionar la categoria", detail: "", life: 3000 });
            return;
        }
  
        console.log("dateTime",dateTime)
        const Evento = {
            idCategoria: Number(CategoriaSelecc),
            idUsuario: User.id,
            detalle: DetalleEvento,
            fecha: dateTime
        };
        if(!dateTime){
            const formatednow =now.toISOString().replace('T', ' ').substring(0, 19);
            Evento.fecha = formatednow
        }
        const urlEvent = "eventos.php"
        console.log("userid",Evento)
        console.log("userapikey",User.apiKey)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': User.apiKey, // Añade tu apikey
                'iduser': User.id, // Añade el iduser
            }
        };
        requestOptions.body = JSON.stringify(Evento);
        try {
            const response = await fetch(url + urlEvent, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            const result = await response.json();
            Evento.id=result.idEvento
            const catIdImagen = categorias.find(cat => cat.id === Evento.idCategoria).imagen;
            console.log("catIdImagen",catIdImagen)
            const requestOptions2 = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': User.apiKey, // Añade tu apikey
                    'iduser': User.id, // Añade el iduser
                }
            };
            //const srCImg = fetch("https://babytracker.develotion.com/imgs/"+catId+".png")
            dispatch(addEvent(Evento));
            toastTopCenter.current.show({ severity: "success", summary: "evento creado con exito", detail: "", life: 3000 });
            console.log("Evento",result);

        } catch (error) {
            console.error('FetchCategorias error:', error);
        }
    };
    

    return (
        <>
        <div style={{width:"50px"}} className="card flex justify-content-center">
                <Toast style={{width:"50px",height:"30px"}} ref={toastTopCenter} position="top-center" />
        </div>
        <div className='content'>
            <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                    className="form-select1"
                    aria-label="Seleccionar Categoría"
                    onChange={(e) => setCategoriaSelecc(e.target.value)}
                    value={CategoriaSelecc}
                    required
                >
                    <option value="">Seleccionar...</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.tipo}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>fecha y hora:</Form.Label>
                <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    value={dateTime}
                    onChange={handleDateTimeChange}
                    step="1" // Paso de 1 segundo para permitir seleccionar cualquier fecha y hora
                    className="form-control1"
                    required
                />
                <button className='botonHoy' onClick={()=>setDateTime("")}>Hoy</button>
            </Form.Group>

            <Form.Group>
                <Form.Label>Detalle del Evento</Form.Label>
                <Form.Control
                    type="text"
                    className="form-control"
                    value={DetalleEvento}
                    onChange={(e) => setDetalleEvento(e.target.value)}
                    placeholder="Detalle"
                    required
                />
            </Form.Group>

            <button onClick={()=>AddEvent()} className="btn btn-primary">
                Crear Evento
            </button>
            </div>
        </>
    );
};
