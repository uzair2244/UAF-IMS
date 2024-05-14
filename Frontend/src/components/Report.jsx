import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { DatePicker, Space } from 'antd';
import ReportPdf from './ReportPdf';
import DropdownWithInput from './DropdownWithInput';



const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const Report = () => {
    const [name, setName] = useState("");
    const [data, setData] = useState([])
    const [workers, setWorkers] = useState([])
    const [formData, setFormData] = useState({
        user: "",
        date: "",

    })

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/usernames`)
            .then((result) => {
                setWorkers(result.data)
            })
    }, [])
    const onChange = (date, dateString) => {
        setFormData({
            ...formData,
            date: dateString
        })
        console.log(formData)
    };



    const handleClick = async () => {
        const result = await axios.post("http://localhost:3000/api/v1/transaction/get-transactions", formData)
        if (result) {
            setData(result.data)

        }
    };


    return <div className='flex justify-center '>
        <div className=''>
            <Typography.Title level={4} className='pb-2 flex justify-center'>Generate Reports</Typography.Title>
            <Form
                className=''
                name="basic"
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="username"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <DropdownWithInput data={workers} key="workers" name={"workers"} handleFormData={setFormData} formData={formData} />
                </Form.Item>
                <Form.Item
                    label="Month"
                    name="date"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your username!',
                        },
                    ]}
                    wrapperCol={{
                        offset: 1,
                        span: 16,
                    }}>
                    <Space direction="vertical">
                        <DatePicker onChange={onChange} picker='month' />
                    </Space>
                </Form.Item>
                <Form.Item
                    label="Year"
                    name="year"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your username!',
                        },
                    ]}
                    wrapperCol={{
                        offset: 1,
                        span: 16,
                    }}>
                    <Space direction="vertical">
                        <DatePicker onChange={onChange} picker='year' />
                    </Space>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={handleClick}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <ReportPdf data={data} handleData={setData} />
        </div>
    </div>
};
export default Report;