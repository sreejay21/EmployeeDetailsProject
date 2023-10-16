import React, { useState } from "react";
import { getAuthToken } from "../util/auth";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

function AddEmployeeForm() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    personalEmail: "",
    mobileNumber: "",
    postalAddress: "",
    gender: 1,
    country: "3",
    city: "3",
    designation: 1,
    basicPay: 0,
    needTransportation: null ,
    notes: 'https://tse3.mm.bing.net/th?id=OIP.DAuF8ksdA5Kjh7fLifDpnwHaHa&pid=Api&P=0&h=180',
    username: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!formData.firstName) {
      errors.firstName = "First Name is required";
      formIsValid = false;
    }
    if (!formData.lastName) {
      errors.lastName = "Last Name is required";
      formIsValid = false;
    }
    // Additional validation checks for other fields
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
      formIsValid = false;
    }
    if (!formData.personalEmail) {
      errors.personalEmail = "Personal Email is required";
      formIsValid = false;
    }
    if (!formData.mobileNumber) {
      errors.mobileNumber = "Mobile Number is required";
      formIsValid = false;
    }
    if (!formData.postalAddress) {
      errors.postalAddress = "Postal Address is required";
      formIsValid = false;
    }

    if (!formData.postalAddress) {
      errors.postalAddress = "Postal Address is required";
      formIsValid = false;
    }
    // Add validation for other fields as needed

    setErrorMessages(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "http://ztraining.zeronetraining.local/api.publish/api/employee",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          alert("Added Successfully");
          setFormData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            personalEmail: "",
            mobileNumber: "",
            postalAddress: "",
            gender: 1,
            country: "3",
            city: "3",
            designation: 1,
            basicPay: 0,
            needTransportation: true,
            notes: null,
            username: "",
            password: "",
          });
          navigate("/employee");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-employee-form">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errorMessages.firstName && (
            <span className="error">{errorMessages.firstName}</span>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errorMessages.lastName && (
            <span className="error">{errorMessages.lastName}</span>
          )}
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
          {errorMessages.dateOfBirth && (
            <span className="error">{errorMessages.dateOfBirth}</span>
          )}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="personalEmail">Personal Email:</label>
          <input
            type="email"
            id="personalEmail"
            name="personalEmail"
            value={formData.personalEmail}
            onChange={handleInputChange}
          />
          {errorMessages.personalEmail && (
            <span className="error">{errorMessages.personalEmail}</span>
          )}
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
          {errorMessages.mobileNumber && (
            <span className="error">{errorMessages.mobileNumber}</span>
          )}
        </div>
        <div>
          <label htmlFor="postalAddress">Postal Address:</label>
          <input
            type="text"
            id="postalAddress"
            name="postalAddress"
            value={formData.postalAddress}
            onChange={handleInputChange}
          />
          {errorMessages.postalAddress && (
            <span className="error">{errorMessages.postalAddress}</span>
          )}
        </div>
        <div className="form-group">
          <label>Basic Salary:</label>
          <input
            type="number"
            name="basicPay"
            value={formData.basicSalary}
            onChange={handleChange}
            
          />
           {errorMessages.basicPay && (
            <span className="error">{errorMessages.basicPay}</span>
          )}
        </div>
        <div className="form-group">
          <label>Need Transportation:</label>
          <input
            type="checkbox"
            name="needTransportation"
            checked={formData.needTransportation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
