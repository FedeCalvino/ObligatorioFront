import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import "../css/CrearEvento.css"
export const CrearEvento = ({ Categorias, callBackCrearEvent ,Usu}) => {

    const [CategoriaSelecc, setCategoriaSelecc] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [DetalleEvento, setDetalleEvento] = useState('');

    const handleDateTimeChange = (event) => {
        const formattedDateTime = event.target.value.replace('T', ' ');
        setDateTime(formattedDateTime);
        console.log(formattedDateTime)
    };

    const AddEvent = () => {
        const now = new Date();
        const selectedDateTime = new Date(dateTime);

        if (selectedDateTime > now ) {
            //alerta fecha 
            return;
        }
        console.log("dateTime",dateTime)
        if(!dateTime){
            setDateTime("");
        }
        console.log(Usu)
        const Evento = {
            IdCategoria: CategoriaSelecc,
            IdUsuario: Usu.id,
            detalle: DetalleEvento,
            fecha: dateTime
        };

        console.log(Evento);
        callBackCrearEvent(Evento);
    };
    

    return (
        <>
            <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                    className="form-select"
                    aria-label="Seleccionar Categoría"
                    onChange={(e) => setCategoriaSelecc(e.target.value)}
                    value={CategoriaSelecc}
                    required
                >
                    <option value="">Seleccionar...</option>
                    {Categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.tipo}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group>
                <Form.Label>Seleccionar fecha y hora:</Form.Label>
                <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    value={dateTime}
                    onChange={handleDateTimeChange}
                    step="1" // Paso de 1 segundo para permitir seleccionar cualquier fecha y hora
                    className="form-control"
                    required
                />
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
        </>
    );
};
