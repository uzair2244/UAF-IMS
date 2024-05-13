import React, { useState } from 'react';
import { Button, Checkbox, Dropdown, Form, Input, Tooltip, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from 'axios';
import { addRegisteredUser } from '../features/dashboardSlice';
import { useDispatch } from 'react-redux';
import DropDown from "./DropDown"

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};


const AddUser = () => {
    const token = localStorage.getItem("token")
    const headers = { "Authorization": `Bearer ${token}` }
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: ""
    })
    async function handleSubmit(e) {
        e.preventDefault()
        const result = await axios.post(`http://localhost:3000/api/v1/user`, formData, { headers })
        try {
            if (result.status === 201) {
                dispatch(addRegisteredUser());
                messageApi.open({
                    type: 'success',
                    content: 'User added successfully',
                })
            } else if (result.status === 409) {
                messageApi.open({
                    type: 'error',
                    content: 'user already exist'
                })
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div>
            {contextHolder}
            <Form layout="vertical" >
                <div className="my-3 flex justify-center">
                    <Form.Item
                        label="Name"
                        name="name"
                        className="w-full sm:w-1/2"
                    >
                        <Input
                            placeholder="Enter your username"
                            value={formData.name}
                            onChange={e => { setFormData({ ...formData, username: e.target.value }) }}
                            suffix={
                                <Tooltip title="You can login with the name.">
                                    <InfoCircleOutlined style={{ color: "rgba(255,255,255,0.45)" }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </div>
                <div className="my-3 flex justify-center">
                    <Form.Item
                        label="Email"
                        name="email"
                        className="w-full sm:w-1/2"
                    >
                        <Input
                            placeholder="Enter your Email"
                            value={formData.name}
                            onChange={e => { setFormData({ ...formData, email: e.target.value }) }}
                            suffix={
                                <Tooltip title="You can login with the Email.">
                                    <InfoCircleOutlined style={{ color: "rgba(255,255,255,0.45)" }} />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </div>
                <div className="my-3 flex justify-center">
                    <Form.Item
                        label="Password"
                        name="password"
                        className="w-full sm:w-1/2"
                        rules={[
                            { required: true, message: "Please input your password!" },
                            // Add any other password validations here
                        ]}
                    >
                        <Input.Password
                            placeholder="Input Password"
                            value={formData.password}
                            onChange={e => { setFormData({ ...formData, password: e.target.value }) }}
                        // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                </div>
                <div className="my-3 flex justify-center">
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        className="w-full sm:w-1/2"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new TypeError("The two passwords do not match!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                        // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                </div>
                <div className="mx-5 my-3 border pl-[23%]">
                    <DropDown data={formData} handleData={setFormData} />
                </div>

                <div className="my-3 flex justify-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full sm:w-1/2"
                        onClick={handleSubmit}
                    >
                        Create
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddUser
