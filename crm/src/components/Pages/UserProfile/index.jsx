import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Select, Spin, message, Row, Col, Button } from "antd";
import { useAuth } from "../../UserAuth/AuthProvider";

const { Option } = Select;

function UserProfile() {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    
    const roleMap = {
        "Admin": 1,
        "User": 0
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://localhost:7231/api/Employee");
                setEmployees(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                message.error("Failed to load user. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleEmployeeChange = (employeeId) => {
        setSelectedEmployee(employeeId);
        setSelectedRole(null); 
    };

    const updateEmployeeStatus = async () => {
        if (!selectedEmployee) {
            return message.warning("Please select anything.");
        }

        const roleValue = roleMap[selectedRole];
        if (roleValue == null) {
            return message.error("Please select a valid role.");
        }

        const updatedEmployee = {
            ...employees.find(e => e.id === selectedEmployee),
            employeeStatus: roleValue,
        };

        try {
            await axios.put(`https://localhost:7231/api/Employee/${selectedEmployee}`, updatedEmployee);
            message.success("User role updated successfully!");

            const response = await axios.get("https://localhost:7231/api/Employee");
            setEmployees(response.data);
            setSelectedEmployee(null);
            setSelectedRole(null);
        } catch (error) {
            console.error("Failed to update user status:", error);
            message.error("Failed to update user status. Please try again later.");
        }
    };

    if (loading) {
        return <Spin />;
    }

   

    return (
        <div>
            <Typography.Title level={2}>Manage User</Typography.Title>
            {employees.length === 0 ? (
                <Typography.Text>No employees found.</Typography.Text>
            ) : (
                <Row gutter={16}>
                    <Col span={8}>
                        <Select
                            placeholder="Select an user"
                            onChange={handleEmployeeChange}
                            style={{ width: '100%' }}
                            value={selectedEmployee}
                        >
                            {employees.map(employee => (
                                <Option key={employee.id} value={employee.id}>
                                    {`${employee.empName} - ${employee.empCode} - ${Object.keys(roleMap).find(key => roleMap[key] === employee.employeeStatus)}`}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    
                    <Col span={8}>
                        <Select
                            placeholder="Assign new role"
                            onChange={setSelectedRole}
                            style={{ width: '100%' }}
                            value={selectedRole}
                        >
                            {Object.keys(roleMap).map(role => (
                                <Option key={role} value={role}>
                                    {role}
                                </Option>
                            ))}
                        </Select>
                    </Col>

                    <Col span={8}>
                        <Button 
                            type="primary" 
                            onClick={updateEmployeeStatus} 
                            style={{ marginLeft: 16 }}
                            disabled={!selectedRole || !selectedEmployee}
                        >
                            Update Role
                        </Button>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default UserProfile;