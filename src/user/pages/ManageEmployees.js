import React, { useEffect, useState } from "react";

import EmployeeList from "../components/EmployeeList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ManageEmployees = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [employees, setEmployees] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const responseData = await sendRequest("/api/employees");
        setEmployees(responseData.employees);
      } catch (err) {}
    };
    fetchEmployees();
  }, [sendRequest]);

  const deleteEmployeeHandler = async (employeeId) => {
    try {
      await sendRequest(`/api/employees/${employeeId}`, "DELETE");
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && employees && (
        <EmployeeList items={employees} onDeleteEmployee={deleteEmployeeHandler} />
      )}
    </React.Fragment>
  );
};

export default ManageEmployees;