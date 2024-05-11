import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import sidebarReducer from "../features/sidebarSlice";
import taskReducer from "../features/taskSlice";
import dashboardReducer from "../features/dashboardSlice";

export default configureStore({
    reducer: {
        menu: menuReducer,
        sidebar: sidebarReducer,
        task: taskReducer,
        dashboard: dashboardReducer
    }
})