import React from "react";
import { Link } from "react-router-dom";

import Card from "../../user/UIElements/Card";
import "./EmployeeItem.css";

const EmployeeItem = (props) => {
  return (
    <li className="employee-item">
      <Card className="employee-item__content">
        <Link to={`/update/${props.id}`}>
          <div className="employee-item__info">
            <h2>
              {props.firstname} {props.lastname}
            </h2>
            <h3>{props.email}</h3>
          </div>
        </Link>
        <div className="employee-item__actions">
          <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
      </Card>
    </li>
  );
};

export default EmployeeItem;
