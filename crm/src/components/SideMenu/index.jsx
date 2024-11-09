import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    ShopOutlined,
    DashboardOutlined,
    UserAddOutlined,
    FileSearchOutlined,
    FileDoneOutlined,
    BarChartOutlined,
    UserOutlined,
    EditOutlined
} from '@ant-design/icons';

const SideMenu = ({ userRole }) => {
    const navigate = useNavigate();  
    console.log("Tasks: ", userRole);
   if (userRole==='ADMIN')
   {
    return (
        <div className="SideMenu">
            <Menu
                onClick={(item) => navigate(item.key)}  
                items={[
                    { label: "Dashboard", key: '/dashboard', icon: <DashboardOutlined /> },
                    { label: "ADD COURSE", key: '/assigntask', icon: <UserAddOutlined /> },
                    { label: "EDIT COURSE", key: '/updatetask', icon: <EditOutlined  /> },
                    { label: "DELETE COURSE", key: '/createleads', icon: <ShopOutlined /> },
                    { label: "User Profile", key: '/userprofile', icon: <UserOutlined /> },
                    
                  
                    
                ]}
            />
        </div>
    );
   }
   if (userRole==='USER')
    {
     return (
         <div className="SideMenu">
             <Menu
                 onClick={(item) => navigate(item.key)}  
                 items={[
                    { label: "Dashboard user", key: '/FollowupLeads', icon: <FileSearchOutlined /> },
                 ]}
             />
         </div>
     );
    }
   
}

export default SideMenu;