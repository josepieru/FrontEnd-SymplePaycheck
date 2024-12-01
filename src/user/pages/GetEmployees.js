import React, { useEffect, useState } from "react";
import EmployeeList from "../components/EmployeeList";

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch employees.");
        }
        setEmployees(data.employees || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      {error && <p>{error}</p>}
      {employees.length > 0 ? (
        <EmployeeList items={employees} />
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default GetEmployees;
