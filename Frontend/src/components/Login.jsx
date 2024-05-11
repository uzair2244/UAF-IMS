import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Typography, Image, message } from 'antd';
import { json, useNavigate } from 'react-router-dom';
import logo from "/logo.svg"
import axios from 'axios';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login = () => {

    const [messageApi, contextHolder] = message.useMessage()


    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (formData.email == "" || formData.password == "") {
            messageApi.open({
                type: "warning",
                content: "Please fill all the fields"
            })}
        else {
            await axios.post("http://localhost:3000/api/v1/admin/login", formData)
                .then((result) => {
                    console.log(result)
                    if (result.status === 200) {

                        localStorage.setItem('token', result.data.token)
                        navigate("/dashboard")
                    }
                }
        ).catch((error)=>
            messageApi.open({
                type: "error",
                content: "Invalid Credentials"
            })
        )}

}

// const handleSubmit = ()=>{
//     localStorage.setItem("username",formData.username);
//     localStorage.setItem("password",formData.password);
//     navigate("/dashboard")
// }

const [formData, setFormData] = useState({
    email: "",
    password: ""
})

return (
    <div className='flex justify-center items-center h-screen'>
        {contextHolder}
        <div className='h-full w-3/4 bg-slate-300 flex justify-center items-center'>
            <Image src={logo} width={270} />
        </div>
        <div className='w-1/2 h-screen items-center justify-center flex flex-col'>
            <Typography.Title level={3}>Login Form</Typography.Title>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
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
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password onChange={e => setFormData({ ...formData, password: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
)
};
export default Login;