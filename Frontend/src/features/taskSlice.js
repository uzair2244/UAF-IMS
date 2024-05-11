import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        pending: 0
    },
    reducers: {
        countPending: (state, action)=>{
            const p = action.payload.filter((item)=>{return item.status === "pending"})
            state.pending = p.length
        },
        increment: (state)=>{
            state.pending += 1
        },
        decrement: (state)=>{
            state.pending -=1
        }
    }
})

export const {countPending, increment, decrement} = taskSlice.actions;
export default taskSlice.reducer;