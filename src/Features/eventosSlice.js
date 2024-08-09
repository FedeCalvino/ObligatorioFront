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
            state.eventos.splice(action.payload, 1); // Remove the event at the specified index
            console.log("Evento eliminado en el índice:", action.payload);
        }
    }
});

export const { addEvent,deleteEvent, setEvent} = eventosSlice.actions;

export default eventosSlice.reducer;