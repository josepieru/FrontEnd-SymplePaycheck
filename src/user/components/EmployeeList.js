import React from "react";
import PropTypes from "prop-types"; 
import EmployeeItem from "./EmployeeItem";
import Card from "../../user/UIElements/Card";
import "./EmployeeList.css";

const EmployeeList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No employees found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="employee-list">
      {props.items.map((employee) => (
        <EmployeeItem
          key={employee.id}
          id={employee.id}
          firstname={employee.firstname}
          lastname={employee.lastname}
          email={employee.email}
          onDelete={props.onDeleteEmployee}
          onUpdate={props.onUpdateEmployee}
        />
      ))}
    </ul>
  );
};

EmployeeList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteEmployee: PropTypes.func,
  onUpdateEmployee: PropTypes.func,
};

EmployeeList.defaultProps = {
  items: [],
  onDeleteEmployee: () => {},
  onUpdateEmployee: () => {},
};

export default EmployeeList;
