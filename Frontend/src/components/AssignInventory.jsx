import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Form, Input, Select, Space, Tooltip, Typography, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { countPending } from '../features/taskSlice';
import { increment } from '../features/taskSlice';
import DropdownWithInput from './DropdownWithInput';
import { InputNumber } from 'antd';
import { addRegisteredUser, addTaskPending, addTasksAssigned, addTotalProducts } from '../features/dashboardSlice'
import { userSelect } from '../app/selectors';
import { useSelector } from 'react-redux';



const { Option } = Select;
const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

const AssignTask = () => {

    const [items, setItems] = useState([])
    const [workers, setWorkers] = useState([])
    const [totalItems, setTotalItems] = useState([])

    const users = useSelector(userSelect)
    const [formData, setFormData] = useState({
        assigner: users.user._id,
        user: "",
        item: "",
        quantity: "",
        description: ""
    })

    const onChange = (value) => {
        console.log('changed', value);
        setFormData({ ...formData, quantity: value })
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/products/names`)
            .then((result) => {
                setItems(result.data.products)
            })
        axios.get(`http://localhost:3000/api/v1/user/usernames`)
            .then((result) => {
                setWorkers(result.data)
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

    async function handleAssign(e) {
        e.preventDefault()
        axios.post(`http://localhost:3000/api/v1/transaction/assign`, formData, { headers })
            .then(result => {
                if (result.status === 201) {
                    messageApi.open({
                        type: 'success',
                        content: 'Inventory assigned successfully.'
                    })
                }
            })
    }


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
                            <DropdownWithInput data={items} key={"items"} name={"items"} handleFormData={setFormData} formData={formData} handleTotalItem={setTotalItems} />
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
                            <InputNumber min={1} max={parseInt(totalItems)} onChange={onChange} />
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
                            <DropdownWithInput data={workers} key="workers" name={"workers"} handleFormData={setFormData} formData={formData} />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
                <Form.Item name={['user', 'description']} label="Description">
                    <Input.TextArea value={data.description} onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} />
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit" onClick={handleAssign} >
                        Assign Inventory
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AssignTask;