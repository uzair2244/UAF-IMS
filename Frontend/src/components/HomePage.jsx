import React from 'react'
import { Layout, Typography, Image, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import backGround from "/S6.jpg"


const HomePage = () => {
  const { Header } = Layout
  const { Title } = Typography
  const navigate = useNavigate()
  return (
    <div>
      <Header className='flex p-2 justify-around relative'>
        <Image src='/logo.svg' width={50} height={50} />
        <Title level={2}  style={{ color: 'white' }}>
          University of Agriculture Faisalabad
        </Title>
        <Button className='mt-2' type='primary' onClick={() => { navigate("/login") }}>Login</Button>
      </Header>
      <div>
        <img src={backGround} alt='img_uni' className='h-[90vh] blur' />
        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center beautiful-font'>Welcome to the UAF Inventory</h1>
        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10 beautiful-font-desc'>
        Efficiency, Precision, Liberation.
        </h1>
      </div>
      <footer>
        <h3 className='fixed bottom-0 w-full bg-[#001529] text-white p-4 text-center beautiful-font-footer'>@All Right Reserved 2024</h3>
      </footer>

    </div>
  )
}

export default HomePage
