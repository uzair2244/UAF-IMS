import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import Cards from './Cards'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelect, userSelect } from '../app/selectors'
import { addTotalProducts, addRegisteredUser, addTasksAssigned, addTaskPending } from '../features/dashboardSlice'
import axios from 'axios'

const Dash = () => {
    const dispatch = useDispatch()
    const dashboard = useSelector(dashboardSelect)
    const users = useSelector(userSelect)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/products`)
            .then(res => dispatch(addTotalProducts(res.data.products.length)))
        axios.get(`http://localhost:3000/api/v1/user`)
            .then(res => {
                dispatch(addRegisteredUser(res.data.users.length))
            })
        axios.get(`http://localhost:3000/api/v1/task/${users.user._id}`)
            .then(res => {
                console.log(res.data.tasks)
                dispatch(addTasksAssigned(res.data.tasks.length))
            })
        axios.get(`http://localhost:3000/api/v1/task/pending/${users.user._id}`)
            .then(res => {
                console.log(res.data.tasks)
                dispatch(addTaskPending(res.data.tasks.length))
            })
    }, [])



    return (
        <div className='flex flex-col gap-5'>
            <Row gutter={16}>
                <Col span={8}>
                    <Cards card_title={"Registered Users"} card_content={dashboard.registeredUsers} />
                </Col>
                <Col span={8}>
                    <Cards card_title={"Total Products"} card_content={dashboard.totalProducts} />
                </Col>
                <Col>
                    <Cards card_title={"Tasks Assigned"} card_content={dashboard.taskAssigned} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Cards card_title={"Tasks Pending"} card_content={dashboard.tasksPending} />
                </Col>
                {/* <Col span={8}>
                    <Cards card_title={"??"} card_content={"Content will mention here."} />
                </Col>
                <Col>
                    <Cards card_title={"??"} card_content={"Content will mention here."} />
                </Col> */}
            </Row>
        </div>
    )
}

export default Dash
