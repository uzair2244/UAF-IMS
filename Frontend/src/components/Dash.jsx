import React from 'react'
import { Row,Col } from 'antd'
import Cards from './Cards'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelect } from '../app/selectors'
import {reduceTaskPending} from '../features/dashboardSlice'

const Dash = () => {
    const dispatch = useDispatch()
    const dashboard = useSelector(dashboardSelect)
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
