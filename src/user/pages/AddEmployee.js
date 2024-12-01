import React, { useState } from "react";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const addEmployeeHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add employee.");
      }
      setMessage("Employee added successfully!");
      setEmployee({ firstname: "", lastname: "", email: "" }); 
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {message && <p>{message}</p>}
      <form onSubmit={addEmployeeHandler}>
        <input
          type="text"
          placeholder="First Name"
          value={employee.firstname}
          onChange={(e) =>
            setEmployee((prev) => ({ ...prev, firstname: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={employee.lastname}
          onChange={(e) =>
            setEmployee((prev) => ({ ...prev, lastname: e.target.value }))
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) =>
            setEmployee((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
