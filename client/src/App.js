import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Database from "./components/Database";
import Campaigns from "./components/Campaigns";
import CRM from "./components/CRM";
import VerifyEmail from "./components/VerifyEmail";
import NotFound from "./components/NotFound";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  console.log("###########", process.env.REACT_APP_SERVER_URI);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/database"
          element={<ProtectedRoute element={<Database />} />}
        />
        <Route
          path="/campaigns"
          element={<ProtectedRoute element={<Campaigns />} />}
        />
        <Route path="/crm" element={<ProtectedRoute element={<CRM />} />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
};

export default App;
