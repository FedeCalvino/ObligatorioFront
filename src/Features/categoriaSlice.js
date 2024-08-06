import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuenta: 44
}

export const categoriaSlice = createSlice({
    name: "contador",
    initialState,
    reducers: {
        incrementar: state => {
            //immer
            state.cuenta++
        }

    }
})

export const { incrementar } = categoriaSlice.actions;
export default categoriaSlice.reducer;