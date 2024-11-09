import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import AssignTask from "../Pages/AssignTask";
import CreateLeads from "../Pages/CreateLeads/index";
import Followupleads from "../Pages/Followupleads/FollowupLeads";
import UserProfile from "../Pages/UserProfile";
import UpdateTask from "../Pages/UpdateTask";

function AppRoutes({ addLead, leads }) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard tasks={leads} />} />
            <Route path="/assigntask" element={<AssignTask addTask={addLead} />} />
            <Route path="/createleads" element={<CreateLeads addLead={addLead} />} />
            <Route path="/followupleads" element={<Followupleads leads={leads} />} />
            <Route path="/userprofile" element={<UserProfile leads={leads} />} />
            <Route path="/updatetask" element={<UpdateTask addTask={addLead} />} />
        </Routes>
    );
}

export default AppRoutes;