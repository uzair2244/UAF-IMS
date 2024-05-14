import React, { useEffect, useState } from 'react'
import { Layout, Menu, Image, Flex, theme, Badge, Space } from 'antd'
import {
  UserAddOutlined,
  DashboardOutlined,
  CalendarOutlined,
  LogoutOutlined,
  PlusOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import logo from "/logo.svg"
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from "../features/sidebarSlice"
import { taskSelect } from '../app/selectors';
import { countPending } from '../features/taskSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userSlice from '../features/userSlice';
import { userSelect, dashboardSelect } from '../app/selectors';



const { Sider } = Layout

const headers = { "Authorization": "Bearer" } //token add karna h 

const Sidebar = ({ handleCollapse }) => {
  const dashboard = useSelector(dashboardSelect)
  const dispatch = useDispatch()
  const task = useSelector(taskSelect)
  const users = useSelector(userSelect)
  // console.log(task.pending)
  const navigate = useNavigate()

  async function getTasks() {
    const result = await axios.get("http://localhost:3000/api/v1/task", { headers })
    if (result) {
      dispatch(countPending(result.data.tasks))
    }
  }

  useEffect(() => {
    getTasks();
  }, [])


  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => { dispatch(setSelected({ selected: "dashboard" })) }
    },
    (users.user.role === 'admin' || users.user.role === 'management') && {
      key: '2',
      icon: <PlusOutlined />,
      label: 'Inventory',
      children: [
        {
          key: '2-1',
          label: 'Add Inventory',
          onClick: () => { dispatch(setSelected({ selected: "add inventory" })) }
        },
        {
          key: '2-2',
          label: 'View Inventory',
          onClick: () => { dispatch(setSelected({ selected: "edit inventory" })) }
        },
      ]
    },
    users.user.role === 'admin' && {
      key: '3',
      icon: <UserAddOutlined />,
      label: 'Users',
      children: [
        {
          key: '3-1',
          label: 'Add User',
          onClick: () => { dispatch(setSelected({ selected: "add user" })) }
        },
        {
          key: '3-2',
          label: 'Edit User',
          onClick: () => { dispatch(setSelected({ selected: "edit user" })) }
        },
      ]
    },
    (users.user.role === 'management' || users.user.role === 'admin') && {
      key: '4',
      icon: <CalendarOutlined />,
      label: 'Assign Inventory',
      onClick: () => { dispatch(setSelected({ selected: "assign inventory" })) },
    },
    {
      key: '5',
      icon: <LineChartOutlined />,
      label: 'Assign Task',
      onClick: () => { dispatch(setSelected({ selected: "assign task" })) }
    },
    {
      key: '6',
      icon: <Space><CalendarOutlined /><Badge size='small' color='red' count={dashboard.tasksPending} /></Space>,
      label: 'Tasks',
      onClick: () => { dispatch(setSelected({ selected: "tasks" })) },
    },
    {
      key: '7',
      icon: <LineChartOutlined />,
      label: 'Reports',
      onClick: () => { dispatch(setSelected({ selected: "reports" })) }
    },

  ]




  return (
    <Sider trigger={null} collapsible collapsed={handleCollapse}
      style={{
        overflow: 'auto',
        height: '100vh',
        // position: 'relative',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="w-full flex justify-center p-4">
        <Image src={logo} width={100} className='' />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}

      />
      <Menu
        className='h-[40%] flex justify-end flex-col'
        theme="dark"
        mode="inline"
        items={[
          {
            key: '0',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => {
              localStorage.removeItem("token")
              navigate("/")
            }
          },
        ]}
      />
    </Sider>
  )
}

export default Sidebar
