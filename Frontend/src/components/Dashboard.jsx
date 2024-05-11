import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import Head from './Head';
import Dash from './Dash';
import { Layout, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import {sidebarSelect} from "../app/selectors"
import { useSelector } from 'react-redux';
import AddProduct from './AddProduct';
import AddUser from './AddUser';
import EditProduct from './EditProduct';
import EditUser from './EditUser';
import Tasks from './Tasks';
import AssignTask from './AssignTasks';

const Dashboard = () => {
    const navigate = useNavigate()
    const sidebar = useSelector(sidebarSelect)
    const selected = sidebar.selected

    useEffect(() => {
        const user = localStorage.getItem("token")
        if (!user) {
            navigate("/login")
        }
    }, [])

    const { Content } = Layout;

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout hasSider style={{ height: "100vh" }}>
            <Sidebar handleCollapse={collapsed} />
            <Layout>
                <Head handleCollapsed={setCollapsed} collapsed={collapsed} />
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflowY: 'auto',
                    }}
                >
                    <div
                        style={{
                            minHeight: "80vh",
                            padding: "30px",
                            // padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {selected === "dashboard" && <Dash />}
                        {selected === "add product" && <AddProduct />}
                        {selected === "add user" && <AddUser />}
                        {selected === "edit product" && <EditProduct />}
                        {selected === "edit user" && <EditUser />}
                        {selected === "tasks" && <Tasks />}
                        {selected === "assign task" && <AssignTask />}
                    
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
