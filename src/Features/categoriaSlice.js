import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categorias: []
};

export const categoriaSlice = createSlice({
    name: "categoria",
    initialState,
    reducers: {
        setCategorias: (state, action) => {
            state.categorias = action.payload;
            console.log("categorias cargadas");
        }
    }
});

export const { setCategorias } = categoriaSlice.actions;


export const selectCategorias = (state) => state.categoria.categorias;

export default categoriaSlice.reducer;