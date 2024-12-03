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
  
    // Title with shading
    doc.setFillColor(230, 230, 230); // Light grey background
    doc.rect(10, 10, 190, 10, 'F'); // Draw rectangle with fill
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Earnings Statement", 15, 17);
  
    // Company Information
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("SimplePaycheck Inc\n647-231-5214\n20 Bay Street\nToronto, ON CA M3H 5ZP", 15, 30);
  
   // Employee Information with shading
    doc.setFillColor(230, 230, 230); // Light grey background
    doc.rect(140, 30, 65, 25, 'F'); // Adjusted rectangle
    doc.text("Employee Information:\n" + `${paystub.employee.firstname} ${paystub.employee.lastname}\n${paystub.employee.phonenumber}\n${paystub.employee.email}`, 145, 35); 


  
    // Pay Date and Period
    doc.text(`Pay Date: ${new Date(paystub.createdAt).toLocaleDateString()}`, 15, 70);
    const payDate = new Date(paystub.createdAt);
    const startDate = new Date(payDate);
    startDate.setDate(payDate.getDate() - 14); // Subtract 14 days for a biweekly period

    doc.text(`Pay Period: ${startDate.toLocaleDateString()} to ${payDate.toLocaleDateString()}`, 15, 80);

    doc.text("Pay Schedule: Weekly", 15, 90);
  
    // Earnings Table with shading
    doc.setFillColor(180, 180, 255); // Light blue background
    doc.rect(10, 100, 190, 10, 'F'); // Draw rectangle with fill
    doc.setFont("helvetica", "bold");
    doc.text("Earnings", 15, 107);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const earnings = [
      ["Hourly Rate", paystub.hourlyRate],
      ["Worked Hours", paystub.workedHours],
      ["Gross Pay", paystub.grossPay]
    ];
    let yPos = 120;
    earnings.forEach(([label, value]) => {
      doc.text(label, 15, yPos);
      doc.text(value.toString(), 100, yPos);
      yPos += 10;
    });
  
    // Deductions Table with shading
    doc.setFillColor(180, 180, 255); // Light blue background
    doc.rect(10, yPos, 190, 10, 'F'); // Draw rectangle with fill
    doc.setFont("helvetica", "bold");
    doc.text("Deductions", 15, yPos + 7);
  
    yPos += 20;
    const deductions = [
      ["Provincial Tax", paystub.deductions.provincialTax],
      ["CPP", paystub.deductions.cpp],
      ["EI", paystub.deductions.ei],
      ["Total Deductions", paystub.totalDeductions]
    ];
    deductions.forEach(([label, value]) => {
      doc.text(label, 15, yPos);
      doc.text(value.toString(), 100, yPos);
      yPos += 10;
    });
  
    // Net Pay with shading
    doc.setFillColor(230, 230, 230); // Light grey background
    doc.rect(10, yPos, 190, 10, 'F'); // Draw rectangle with fill
    doc.setFont("helvetica", "bold");
    doc.text(`Net Pay: ${paystub.netPay}`, 15, yPos + 7);
  
    // Save the PDF
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
