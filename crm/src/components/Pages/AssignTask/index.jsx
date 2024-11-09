import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Input, Button, Form, Select, DatePicker, message } from 'antd';
import moment from 'moment'; 

const { Option } = Select;

function AssignTask() {
    const [form] = Form.useForm();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://localhost:7231/api/Employee');
                setEmployees(response.data); 
            } catch (error) {
                
            }
        };

        fetchEmployees();
    }, []);

    const onFinish = async (values) => {
        const selectedEmployee = employees.find(emp => emp.empCode === values.employee);
        
        const newTask = {
            Coursename: values.Coursename,
            Courseduration: values.Courseduration,
            Faculty: values.Faculty,
            Amount: values.Amount,
            startdate: values.startdate.toISOString(), 
            description: values.description,
        };

        try {
            const response = await axios.post('https://localhost:7231/api/Task', newTask);
            if (response.status === 201) {
                message.success('Course Added successfully.');
                form.resetFields();
            }
        } catch (error) {
            console.error('Error creating Course:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                message.error(`Failed to add Course: ${error.response.data}`);
            } else {
                message.error('Failed to add Course. Please try again.');
            }
        }
    };

    const disablePastDates = (current) => {
        return current && current < moment().startOf('day');
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography.Title level={3}>ADD COURSE</Typography.Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="Coursename"
                    label="Course Name"
                    rules={[{ required: true, message: 'Please enter the Course Name' }]}
                >
                    <Input 
                        placeholder="Enter Course Name" 
                        onChange={(e) => form.setFieldsValue({ Corsename: e.target.value.toUpperCase() })} 
                    />
                </Form.Item>
                <Form.Item
                    name="Courseduration"
                    label="Course Duration"
                    rules={[{ required: true, message: 'Please enter course duration' }]}
                >
                    <Input placeholder="Enter Course Duration" />
                    
                </Form.Item>
                <Form.Item
                    name="Faculty"
                    label="Faculty"
                    rules={[{ required: true, message: 'Please enter Faculty' }]}
                >
                    <Input placeholder="Enter Course Faculty" />
                    
                </Form.Item>
                <Form.Item
                    name="Amount"
                    label="Course Amount"
                    rules={[{ required: true, message: 'Please enter Course Amount' }]}
                ><Input placeholder="Enter Course Amount" />
                   
                </Form.Item>

                <Form.Item
                    name="startdate"
                    label="Course start date"
                    rules={[{ required: true, message: 'Please select Course start date' }]}
                >
                    <DatePicker 
                        style={{ width: '100%' }} 
                        disabledDate={disablePastDates} 
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: false }]} 
                >
                    <Input.TextArea 
                        rows={4} 
                        placeholder="Enter description" 
                        onChange={(e) => form.setFieldsValue({ remarks: e.target.value.toUpperCase() })} 
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>ADD</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AssignTask;