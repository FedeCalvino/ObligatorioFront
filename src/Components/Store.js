import { configureStore } from "@reduxjs/toolkit";
import categoriaSlice from "../Features/categoriaSlice";

export const Store = configureStore({
    reducer: {
        categorias: categoriaSlice,
    }
})

