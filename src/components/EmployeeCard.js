import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FlipCard from "react-card-flip";
import "./EmployeeCard.css"; // Make sure your existing styles are imported

import { getAuthToken } from "../util/auth";

const EmployeeCard = ({ employee, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const token = getAuthToken();
  const needTransportationValue = employee.needTransportation ? "Yes" : "No";

  const handleDeleteClick = (employeeID) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      axios
        .delete(
          `http://ztraining.zeronetraining.local/api.publish/api/employee/${employeeID}`,
          {
            method: "Delete",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          alert("Deleted Successfully");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="employee-card" onClick={() => setIsFlipped(!isFlipped)}>
      <FlipCard isFlipped={isFlipped} flipDirection="horizontal">
        <div className="employee-face front">
          <img
            className="employee-avatar"
            src={employee.notes}
            alt={`${employee.firstName} ${employee.lastName}`}
          />
          <h3 className="employee-name">{`${employee.firstName} ${employee.lastName}`}</h3>
          {/* Front face content */}
          <p className="employee-email">Email: {employee.personalEmail}</p>
          <p className="employee-contactNumber">
            Contact Number: {employee.mobileNumber}
          </p>
          <p className="employee-address">Address: {employee.postalAddress}</p>
          <p className="employee-address">City: {employee.city}</p>
          <p className="employee-address">
            Need Transportation: {needTransportationValue}
          </p>
          <Link className="edit-button" to={`/edit/${employee.employeeID}`}>
            Edit
          </Link>
          <button
            className="deleteBtn"
            onClick={() => handleDeleteClick(employee.employeeID)}
          >
            Delete
          </button>
        </div>
        <div className="employee-face back">
          <div>
            <p className="employee-dob">
              Date of Birth: {employee.dateOfBirth}
            </p>
            <p className="employee-gender">Gender: {employee.gender}</p>
            <p className="employee-salary">Salary: {employee.basicPay}</p>
            <p className="employee-gender">
              Designation: {employee.designation}
            </p>
          </div>
        </div>
      </FlipCard>
    </div>
  );
};

export default EmployeeCard;
