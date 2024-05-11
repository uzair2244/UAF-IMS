import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice =  createSlice({
    name:"dashboard",
    initialState:{
        registeredUsers:2,
        taskAssigned: 1,
        totalProducts: 1,
        tasksPending: 1
    },
    reducers:{
        addRegisteredUser:(state,action)=>{
            state.registeredUsers += 1
        },
        addTasksAssigned:(state,action)=>{
            state.taskAssigned += 1
        },
        addTotalProducts:(state,action)=>{
            state.totalProducts += 1
        },
        addTaskPending:(state,action)=>{
            state.tasksPending += 1
        },
        reduceTaskPending:(state,action)=>{
            state.tasksPending -= 1
        }

    }
})
export const {addRegisteredUser, addTaskPending, addTasksAssigned, addTotalProducts, reduceTaskPending} = dashboardSlice.actions
export default dashboardSlice.reducer