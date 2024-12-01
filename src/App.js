import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainNavigation from "./user/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import GetEmployees from "./user/pages/GetEmployees";
import AddEmployee from "./user/pages/AddEmployee";
import UpdateEmployeeForm from "./user/pages/UpdateEmployeeForm";
import Employee from "./user/pages/Employee";
import { AuthContext } from "./user/context/auth-context";
import { useAuth } from "./user/hooks/auth-hook";


const App = () => {
  const { token, login, logout, userId } = useAuth();

  const routes = (
    <Routes>
      {token && (
        <>
          <Route path="/employees" element={<GetEmployees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/update/:employeeId" element={<UpdateEmployeeForm />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="*" element={<Navigate to="/employees" />} />
        </>
      )}
      <Route path="/employee" element={<Employee />} />
      {!token && (
        <>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </>
      )}
    </Routes>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
