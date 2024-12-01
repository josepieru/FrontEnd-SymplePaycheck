import React, { useState, useCallback } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

import "./Employee.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validator";

const Employee = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [paystubs, setPaystubs] = useState([]);
  const [message, setMessage] = useState("");

  const inputHandler = useCallback((id, value, isValid) => {
    if (id === "title") {
      setEmployeeId(value);
    }
  }, []);

  const fetchPaystubsHandler = useCallback(async () => {
    setMessage(""); // Reset the message
    console.log('Fetching paystubs for employee ID:', employeeId);
    try {
      const response = await axios.get(`/api/paystub/employee/${employeeId}`);
      console.log('Response data:', response.data);
      if (response.data.paystubs.length === 0) {
        setMessage(response.data.message || "No paystubs found for this employee.");
        setPaystubs([]);
      } else {
        setPaystubs(response.data.paystubs);
      }
    } catch (err) {
      console.error("Failed to fetch paystubs:", err);
      setMessage("Employee ID not found in the system.");
      setPaystubs([]);
    }
  }, [employeeId]);

  const downloadPDF = (paystub) => {
    const doc = new jsPDF();
    doc.text(`Paystub for ${paystub.employee.firstname} ${paystub.employee.lastname}`, 10, 10);
    doc.text(`Date: ${new Date(paystub.createdAt).toLocaleDateString()}`, 10, 20);
    doc.text(`Hourly Rate: ${paystub.hourlyRate}`, 10, 30);
    doc.text(`Worked Hours: ${paystub.workedHours}`, 10, 40);
    doc.text(`Gross Pay: ${paystub.grossPay}`, 10, 50);
    doc.text(`Provincial Tax: ${paystub.deductions.provincialTax}`, 10, 60);
    doc.text(`CPP: ${paystub.deductions.cpp}`, 10, 70);
    doc.text(`EI: ${paystub.deductions.ei}`, 10, 80);
    doc.text(`Total Deductions: ${paystub.totalDeductions}`, 10, 90);
    doc.text(`Net Pay: ${paystub.netPay}`, 10, 100);
    doc.save(`Paystub_${new Date(paystub.createdAt).toLocaleDateString()}.pdf`);
  };

  return (
    <form className="place-form" onSubmit={(event) => { event.preventDefault(); fetchPaystubsHandler(); }}>
      <p className="instruction-text">Please enter the employee ID provided by your employer then hit Search.</p>
      <Input
        id="title"
        element="input"
        type="text"
        label="Employee ID"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid employee id."
        onInput={inputHandler}
      />
      <button type="submit">Search Paystubs</button>
      {message && <p className="error-message">{message}</p>}
      <div className="paystub-list">
        {paystubs.length > 0 && paystubs.map((paystub) => (
          <div key={paystub._id} className="paystub-item">
            <span>{new Date(paystub.createdAt).toLocaleDateString()}</span>
            <button type="button" onClick={() => downloadPDF(paystub)}>
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Employee;
