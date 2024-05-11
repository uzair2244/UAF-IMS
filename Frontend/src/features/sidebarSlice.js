import { createAction, createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        selected:"dashboard" 
    },
    reducers:{
        setSelected: (state, action) => {
            state.selected = action.payload.selected
        }
    }
})

export const {setSelected} = sidebarSlice.actions
export default sidebarSlice.reducer