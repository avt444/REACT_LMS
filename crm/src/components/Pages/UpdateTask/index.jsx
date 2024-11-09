import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Input, Button, Form, Select, DatePicker, message } from 'antd';
import moment from 'moment';

const { Option } = Select;

function UpdateTask() {
    const [form] = Form.useForm();
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [taskDetails, setTaskDetails] = useState(null);

    useEffect(() => {
        const fetchTasksAndEmployees = async () => {
            try {
                const [tasksResponse, employeesResponse] = await Promise.all([
                    axios.get('https://localhost:7231/api/Task'),
                ]);
                setTasks(tasksResponse.data);
                setEmployees(employeesResponse.data);
            } catch (error) {
                
            }
        };

        fetchTasksAndEmployees();
    }, []);

    const handleTaskSelect = async (courseid) => {
        if (!courseid) {
            setTaskDetails(null);
            form.resetFields();
            return;
        }

        try {
            const response = await axios.get(`https://localhost:7231/api/Task/${courseid}`);
            const taskData = response.data;

            setTaskDetails(taskData);
            form.setFieldsValue({
                coursenewid:taskData.courseid,
                coursename: taskData.coursename,
                courseduration: taskData.courseduration,
                faculty: taskData.faculty,
                amount: taskData.amount,
                startdate: moment(taskData.startdate),
                description: taskData.description,
            });
        } catch (error) {
            console.error('Failed to fetch Course details:', error);
            message.error('Failed to load Course details. Please try again.');
        }
    };

    const onFinish = async (values) => {
        
        const newTask = {
            id:values.courseid,
            courseid:values.coursenewid,
            coursename: values.coursename,
            courseduration: values.courseduration,
            faculty: values.faculty,
            amount: values.amount,
            startdate: moment(values.startdate),
            description: values.description,
        };
        
        try {
           
        const response = await axios.put(`https://localhost:7231/api/Task/${values.courseid}`, newTask);
        
        if (response.status == 204)
            {
            message.success('Course updated successfully.');
            form.resetFields();
            setTaskDetails(null);
            }
        } catch (error) {
            console.error('Error updating Course:', error);
            message.error('Failed to update Course. Please try again.');
        }
    };

    const handleResetRemarks = () => {
        form.setFieldsValue({ description: '' });
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography.Title level={3}>Update Course</Typography.Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="courseid"
                    label="Select Course"
                    rules={[{ required: true, message: 'Please select a Course' }]} 
                >
                    <Select onChange={handleTaskSelect} placeholder="Select a Course">
                        {tasks.map((task) => (
                            <Option key={task.id} value={task.id}>
                                {task.coursename}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                {taskDetails && (
                    <>
                    <Form.Item
                            name="coursenewid"
                            label="Course ID"
                            rules={[{ required: true, message: 'Course ID is required' }]} 
                        >
                            <Input  disabled/>
                        </Form.Item>
                        <Form.Item
                            name="coursename"
                            label="Course Name"
                            rules={[{ required: true, message: 'Course name is required' }]} 
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            name="courseduration"
                            label="Course Duration"
                            rules={[{ required: true, message: 'Course name is required' }]} 
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            name="faculty"
                            label="Faculty"
                            rules={[{ required: true, message: 'Course name is required' }]} 
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            label="Course Amount"
                            rules={[{ required: true, message: 'Course name is required' }]} 
                        >
                            <Input  />
                        </Form.Item>


                        <Form.Item
                            name="startdate"
                            label="Course start date"
                            rules={[{ required: true, message: 'Target date is required' }]} 
                        >
                            <DatePicker 
                                style={{ width: '100%' }} 
                                 
                            />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <Input.TextArea 
                                rows={4}
                                onChange={(e) => form.setFieldsValue({ remarks: e.target.value.toUpperCase() })} 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%', marginRight: '2%' }}>Update Course</Button>
                        </Form.Item>
                    </>
                )}
            </Form>
        </div>
    );
}

export default UpdateTask;