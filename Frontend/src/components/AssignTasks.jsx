import React, { useState } from 'react';
import { Button, Descriptions, Form, Input, Select, Space, Tooltip, Typography, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { countPending } from '../features/taskSlice';
import { increment } from '../features/taskSlice';
import {addRegisteredUser,addTaskPending,addTasksAssigned,addTotalProducts} from '../features/dashboardSlice'
const { Option } = Select;
const onFinish = (values) => {
    console.log('Received values of form: ', values);
};
const AssignTask = () => {

    const headers = { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2E2M2M4NDM2NmY0Y2Y3M2JmNjA0MCIsImlhdCI6MTcxNTEwMzkzNCwiZXhwIjoxNzE1MTkwMzM0fQ.FmWb7u9FbJQMxpCclcmb-CsScrICXc0_dJEVRtdUzeA" }
    const [messageApi, contextHolder] = message.useMessage()

    const dispatch = useDispatch()
    const [data, setData] = useState({
        title: "",
        worker: "",
        description: ""
    })

    async function handleClick(e) {
        e.preventDefault()
        const result = await axios.post("http://localhost:3000/api/v1/task", data, { headers })
        if(result.status === 200){
            dispatch(increment())
            dispatch(addTasksAssigned())
            dispatch(addTaskPending())
            messageApi.open({
                type: "success",
                content: "Task Inserted Successfully"
            })
        }else{
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
                                value={data.title}
                                onChange={(e) => { setData({ ...data, title: e.target.value }) }}
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
                            <Input
                                style={{
                                    width: 160,
                                }}
                                value={data.worker}
                                onChange={(e) => { setData({ ...data, worker: e.target.value }) }}
                                placeholder="Please input the worker name"
                            />
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
                <Form.Item name={['user', 'description']} label="Description">
                    <Input.TextArea value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} />
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