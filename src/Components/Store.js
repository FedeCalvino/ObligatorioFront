import { configureStore } from "@reduxjs/toolkit";
import categoriaSlice from "../Features/categoriaSlice";
import eventosSlice from "../Features/eventosSlice";

export const Store = configureStore({
    reducer: {
        categorias: categoriaSlice,
        eventos:eventosSlice
    }
})

