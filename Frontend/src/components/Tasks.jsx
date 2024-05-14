import React, { useEffect, useState } from 'react';
import { Steps, Typography, Button, message } from 'antd';
import Timer from './Timer';
import axios from 'axios';
import { decrement } from '../features/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reduceTaskPending } from '../features/dashboardSlice';
import { userSelect } from '../app/selectors';

const description = 'This is a description.';
const Tasks = () => {

    const dispatch = useDispatch();
    const users = useSelector(userSelect)
    const [messageApi, contextHolder] = message.useMessage()
    const token = localStorage.getItem('token')

    const headers = { "Authorization": `Bearer ${token}` }
    const [tasks, setTasks] = useState([])

    async function getTasks() {
        const result = await axios.get(`http://localhost:3000/api/v1/task/${users.user._id}`, { headers })
        if (result) {
            setTasks(result.data.tasks)
        }
    }

    async function handleCompletion(id) {
        const result = await axios.put(`http://localhost:3000/api/v1/task/${id}`, { headers })

        if (result.status === 200) {
            dispatch(decrement());
            dispatch(reduceTaskPending())
            getTasks();
            console.log(result.data)
        }
    }

    async function handleCancel(id) {
        const result = await axios.delete(`http://localhost:3000/api/v1/task/${id}`, { headers })
        if (result.status === 200) {
            dispatch(decrement());
            // dispatch(reduce())
            getTasks();
            messageApi.open({
                type: "success",
                content: "Task deleted Successfully"
            })
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className='p-10'>
            {contextHolder}
            <div className='flex justify-center py-3'>
                <Typography.Title level={4}>Tasks</Typography.Title>
            </div>
            <div>
                {tasks.map((task) => {
                    return (
                        <>
                            <Steps className='mt-4 p-2'
                                current={task.status == "pending" ? 1 : 2}
                                status={task.status == "pending" ? "process" : "finish"}
                                items={[
                                    {
                                        title: 'Initiated',
                                        description: `Assigned to ${task.user} (
                                            ${task.description})`,
                                    },
                                    {
                                        title: "Pending",
                                        description: `Assigned to ${task.user} (
                            ${task.description})`,

                                    },
                                    {
                                        title: 'Finished',
                                        description: task.description,
                                    },
                                ]}
                            />
                            <Button type='primary' className={`${task.status === "success" ? "hidden" : ""}`} onClick={() => handleCompletion(task._id)}>Done</Button>
                            <Button danger className={`${task.status === "success" ? "hidden" : ""}`} onClick={() => handleCancel(task._id)}>Cancel</Button>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
export default Tasks;