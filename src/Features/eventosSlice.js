// eventosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eventos: []
};

export const eventosSlice = createSlice({
    name: "eventos",
    initialState,
    reducers: {
        setEvent: (state, action) => {
            state.eventos = action.payload;
            console.log("eventos cargados");
        },
        addEvent: (state, action) => {
            state.eventos.push(action.payload);
            console.log("Nuevo evento agregado:", action.payload);
        },
        deleteEvent: (state, action) => {
            const EventoId=action.payload
            console.log("en slice",EventoId)
            state.eventos = state.eventos.filter(evento => evento.id !== EventoId);
        },
        clearEvent: (state) => {
            state.eventos = [];
            console.log("Eventos borrados");
        }
    }
});

export const { addEvent,deleteEvent, setEvent,clearEvent} = eventosSlice.actions;

export default eventosSlice.reducer;