import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEmployeeForm = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    sinnumber: "",
    bankaccount: "",
    transit: "",
    hourlyrate: "",
    workedhours: "",
    taxes: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee details.");
        }
        const data = await response.json();
        setEmployeeData(data.employee);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error("Failed to update employee.");
      }
      alert("Employee updated successfully!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          value={employeeData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastname"
          value={employeeData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="phonenumber"
          value={employeeData.phonenumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="sinnumber"
          value={employeeData.sinnumber}
          onChange={handleChange}
          placeholder="SIN Number"
        />
        <input
          type="text"
          name="bankaccount"
          value={employeeData.bankaccount}
          onChange={handleChange}
          placeholder="Bank Account"
        />
        <input
          type="text"
          name="transit"
          value={employeeData.transit}
          onChange={handleChange}
          placeholder="Transit"
        />
        <input
          type="number"
          name="hourlyrate"
          value={employeeData.hourlyrate}
          onChange={handleChange}
          placeholder="Hourly Rate"
        />
        <input
          type="number"
          name="workedhours"
          value={employeeData.workedhours}
          onChange={handleChange}
          placeholder="Worked Hours"
        />
        <input
          type="number"
          name="taxes"
          value={employeeData.taxes}
          onChange={handleChange}
          placeholder="Taxes"
        />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;