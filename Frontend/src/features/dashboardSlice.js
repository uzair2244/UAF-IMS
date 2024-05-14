import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        registeredUsers: 0,
        taskAssigned: 0,
        totalProducts: 0,
        tasksPending: 0
    },
    reducers: {
        addRegisteredUser: (state, action) => {
            state.registeredUsers = action.payload
        },
        addTasksAssigned: (state, action) => {
            state.taskAssigned = action.payload
        },
        addTotalProducts: (state, action) => {
            state.totalProducts = action.payload
        },
        addTaskPending: (state, action) => {
            state.tasksPending = action.payload
        },
    }
})
export const { addRegisteredUser, addTaskPending, addTasksAssigned, addTotalProducts, reduceTaskPending } = dashboardSlice.actions
export default dashboardSlice.reducer