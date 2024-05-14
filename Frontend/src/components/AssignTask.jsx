import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Form, Input, Select, Space, Tooltip, Typography, message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { countPending } from '../features/taskSlice';
import { increment } from '../features/taskSlice';
import { addRegisteredUser, addTaskPending, addTasksAssigned, addTotalProducts } from '../features/dashboardSlice'
import DropdownWithInput from './DropdownWithInput';
import _ from "lodash"
import { userSelect } from '../app/selectors';



const { Option } = Select;
const onFinish = (values) => {
    console.log('Received values of form: ', values);
};
const AssignTask = () => {
    const token = localStorage.getItem('token')
    const users = useSelector(userSelect)
    const headers = { "Authorization": `Bearer ${token}` }
    const [messageApi, contextHolder] = message.useMessage()
    const [workers, setWorkers] = useState([])

    const [formData, setFormData] = useState({
        title: "",
        worker: "",
        assigner: "",
        description: "",
        user: "",
        date: "",

    })

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/usernames`)
            .then((result) => {
                setWorkers(result.data)
            })
        setFormData({ ...formData, assigner: users.user._id })
    }, [])

    async function handleClick(e) {
        e.preventDefault()
        const result = await axios.post(`http://localhost:3000/api/v1/task`, _.pick(formData, ["title", "user", "description", "assigner"]), { headers })
        if (result.status === 200) {
            dispatch(increment())
            dispatch(addTasksAssigned())
            dispatch(addTaskPending())
            messageApi.open({
                type: "success",
                content: "Task Inserted Successfully"
            })
        } else {
            messageApi.open({
                type: "error",
                content: "Something Went Wrong"
            })
        }
    }


    return (
        <div className='flex flex-col items-center'>
            {contextHolder}
            <Typography.Title level={4} style={{ paddingBottom: "20px" }}> Assign Tasks</Typography.Title>
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
                <Form.Item label="Task Title">
                    <Space>
                        <Form.Item
                            name="Task Title"
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    message: 'Task Title is required',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: 160,
                                }}
                                value={formData.title}
                                onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                                placeholder="Please input"
                            />
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
                    <Input.TextArea value={formData.description} onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }} />
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit" onClick={handleClick}>
                        Assign
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AssignTask;