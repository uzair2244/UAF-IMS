import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, theme, Button, Typography } from 'antd';
import logo from "/logo.svg"

const { Header } = Layout


const Head = ({ handleCollapsed, collapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <div className='flex items-center justify-around px-0'>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => handleCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <Typography.Title level={4}>UAF Inverntory Management System</Typography.Title>
        <img src={logo} width={"20px"} alt="" />
      </div>
    </Header>
  )
}

export default Head
