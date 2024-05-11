import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: "",
    },
    reducers: {
        setMenu: (state, action) => {
            state.menu = action.payload.name
    }}
});

export const {setMenu} = menuSlice.actions
export default menuSlice.reducer