import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Tooltip, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from 'axios';
import {addRegisteredUser} from '../features/dashboardSlice';
import { useDispatch } from 'react-redux';

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
    const headers = {"Authorization":`Bearer ${token}`}
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const [formData, setFormData] = useState({
        name: "",
        password: "",
        authorities: []
    })
    async function handleSubmit(e) {
        e.preventDefault()
        const result = await axios.post(`http://localhost:3000/api/v1/user`, formData, { headers })
        if (result.status === 200) {
            dispatch(addRegisteredUser())
            messageApi.open({
                type: 'success',
                content: 'User added successfully',
            })
        } else {
            messageApi.open({
                type: 'error',
                content: 'Something went wrong',
            })
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
                            onChange={e => { setFormData({ ...formData, name: e.target.value }) }}
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
                <div className="mx-5 my-3 flex justify-center">
                    <Form.Item
                        label="Select the user's authority"
                        name="userAuthority"
                        className="w-full sm:w-1/2"
                    >
                        <Checkbox.Group
                            style={{ width: "100%", display: "grid" }}
                            onChange={(checked) => { setFormData({ ...formData, authorities: checked }) }}
                        >
                            <Checkbox value="newProduct">Add Product</Checkbox>
                            <Checkbox value="editProduct">Edit Product</Checkbox>
                            <Checkbox value="addUser">Add User</Checkbox>
                            <Checkbox value="editUser">Edit User</Checkbox>
                            <Checkbox value="tasks">Tasks</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
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
