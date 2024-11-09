import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const roleMapping = {
    0:'user',
    1: 'Admin'
};

const rolesConfig = {
    USER: {
        id: 0,
        permissions: [
            'update_task',
        ],
    },
    ADMIN: {
        id: 1,
        permissions: [
            'assign_task',
            'update_task',
            'delete_task',
            'approve_lead',
            'return_lead',
            'delete_lead',
            'assign_role',
            'update_role',
        ],
    },
};

const Login = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleLogin = async (values) => {
        setLoading(true);
        const { EmpCode, password } = values;

        if (!EmpCode) {
            message.error('Please input your EmpCode!');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://localhost:7231/api/Employee/login', { EmpCode, password });

            if (response.status === 200) {
                const user = response.data.employee;
                const userRoleId = user.employeeStatus;

                const userRoleString = roleMapping[userRoleId];

               
                console.log(`User logged in: ${user.empName}, Role: ${userRoleString}`);

                const userRoleKey = Object.keys(rolesConfig).find(role => rolesConfig[role].id === userRoleId);
                
                onLogin({
                    ...user,
                    role: userRoleKey,
                    permissions: userRoleKey ? rolesConfig[userRoleKey].permissions : [],
                });

                message.success(`Welcome back, ${user.empName}!`);
                
              
            }
        } catch (error) {
            if (error.response) {
                message.error(`Login failed: ${error.response.data.message || 'Invalid credentials.'}`);
            } else {
                message.error('Login failed. Please check your credentials and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'url("/pop1.gif") no-repeat center center',
            padding: '200px',
            backgroundSize: 'cover',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    maxWidth: 400,
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                }}>
                    {showRegister ? (
                        <Register
                            onRegister={(newUser) => {
                                onLogin(newUser);
                                setShowRegister(false);
                            }}
                            onGoToLogin={() => setShowRegister(false)}
                        />
                    ) : (
                        <>
                            <Title level={2} style={{ fontSize: '24px', height: '50px' }}>LMS</Title>
                            <Form form={form} onFinish={handleLogin}>
                                <Form.Item
                                    name="EmpCode"
                                    rules={[
                                        { required: true, message: 'Please input your usercode!' },
                                        { len: 8, message: 'usercode must be exactly 8 characters!' }
                                    ]}
                                >
                                    <Input 
                                        placeholder="Userid" 
                                        maxLength={8} 
                                        onChange={(e) => {
                                            form.setFieldsValue({ EmpCode: e.target.value.toUpperCase() });
                                        }} 
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Button type="link" onClick={toggleRegister}>
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;