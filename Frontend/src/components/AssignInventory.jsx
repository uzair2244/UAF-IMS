import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Form, Input, Select, Space, Tooltip, Typography, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { countPending } from '../features/taskSlice';
import { increment } from '../features/taskSlice';
import DropdownWithInput from './DropdownWithInput';
import { InputNumber } from 'antd';
import { addRegisteredUser, addTaskPending, addTasksAssigned, addTotalProducts } from '../features/dashboardSlice'



const { Option } = Select;
const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const onChange = (value) => {
    console.log('changed', value);
};
const AssignTask = () => {

    const [items, setItems] = useState([])
    const temp = []
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/products/names`)
            .then((result) => {
                for (let p of result.data.products) {
                    temp.push({ "value": p.name })
                }
                setItems(temp)
            })
    }, [])

    const token = localStorage.getItem('token')

    const headers = { "Authorization": `Bearer ${token}` }
    const [messageApi, contextHolder] = message.useMessage()

    const dispatch = useDispatch()
    const [data, setData] = useState({
        item: "",
        quantity: 0,
        worker: "",
        description: ""
    })

    // async function handleClick(e) {
    //     e.preventDefault()
    //     const result = await axios.post("http://localhost:3000/api/v1/", data, { headers })
    //     if (result.status === 200) {
    //         dispatch(increment())
    //         dispatch(addTasksAssigned())
    //         dispatch(addTaskPending())
    //         messageApi.open({
    //             type: "success",
    //             content: "Task Inserted Successfully"
    //         })
    //     } else {
    //         messageApi.open({
    //             type: "error",
    //             content: "Something Went Wrong"
    //         })
    //     }
    // }


    return (
        <div className='flex flex-col items-center'>
            {contextHolder}
            <Typography.Title level={4} style={{ paddingBottom: "20px" }}> Assign Inventory</Typography.Title>
            <Form
                name="complex-form"
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Items">
                    <Space>
                        <Form.Item
                            name="items"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: 'Task Title is required',
                                },
                            ]}
                        >
                            <DropdownWithInput />
                        </Form.Item>
                    </Space>
                </Form.Item>

                <Form.Item label="Item Quantity: ">
                    <Space>
                        <Form.Item
                            name="item quantiity"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                        </Form.Item>
                    </Space>
                </Form.Item>



                <Form.Item label="Worker">
                    <Space.Compact>
                        <Form.Item
                            name={['name', 'province']}
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: 'Worker is required',
                                },
                            ]}
                        >
                            <DropdownWithInput data={items} />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
                <Form.Item name={['user', 'description']} label="Description">
                    <Input.TextArea value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} />
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit" >
                        Assign Inventory
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AssignTask;