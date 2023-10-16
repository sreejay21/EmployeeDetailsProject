import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import axios from "axios";

const EditEmployee = () => {
  const { employeeID } = useParams();
  const token = getAuthToken();
  const navigate=useNavigate()
  const [values, setValues] = useState({
    employeeID: employeeID,
    firstName: "",
    lastName: "",
    dateOfBirth: "1978-01-26T00:00:00",
    personalEmail: "",
    mobileNumber: "",
    postalAddress: "",
    gender: 1,
    country: "2",
    city: "3",
    designation: 2,
    basicPay: 20000.00,
    needTransportation: false,
    notes:'https://tse3.mm.bing.net/th?id=OIP.DAuF8ksdA5Kjh7fLifDpnwHaHa&pid=Api&P=0&h=180',
    username: "test@123",
    password: ""
  });

  useEffect(() => {
    axios
      .get(
        "http://ztraining.zeronetraining.local/api.publish/api/employee/" +
          employeeID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          
        }
      )
      .then((res) => {
        setValues({
          ...values,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          personalEmail: res.data.personalEmail,
          dateOfBirth: res.data.dateOfBirth,
          postalAddress: res.data.postalAddress,
          mobileNumber: res.data.mobileNumber,
          dateOfBirth: res.data.dateOfBirth,
          gender: res.data.gender,
          country: res.data.country,
          city: res.data.city,
          designation: res.data.designation,
          basicPay: res.data.basicPay,
          needTransportation: res.data.needTransportation,
          notes: res.data.notes,
          username: res.data.username,
          
        });
        console.log(employeeID)
      })
      .catch((err) => console.log(err));
  }, [employeeID]);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://ztraining.zeronetraining.local/api.publish/api/employee/" + employeeID, values,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            
          }
      )
      .then((res) => {
        setValues({
          ...values,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          dateOfBirth:res.data.dateOfBirth,
          personalEmail: res.data.personalEmail,
          mobileNumber: res.data.mobileNumber,
          postalAddress: res.data.postalAddress,
         gender: res.data.gender,
          country: res.data.country,
          city: res.data.city,
          designation: res.data.designation,
          basicPay: res.data.basicPay,
          needTransportation: res.data.needTransportation,
          notes: res.data.notes,
          username: res.data.username,

        });
        alert("Updated Successfully")
        navigate('/employee')
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="add-employee-form">
        <h2>Edit Employee</h2>
        <form onSubmit={handleEditSubmit} className="form-group">
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="personalEmail">Personal Email:</label>
            <input
              type="email"
              id="personalEmail"
              name="personalEmail"
              value={values.personalEmail}
              onChange={(e) =>
                setValues({ ...values, personalEmail: e.target.value })
              }
            />
          </div>
         

          <div>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={values.mobileNumber}
              onChange={(e) =>
                setValues({ ...values, mobileNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="postalAddress">Postal Address:</label>
            <input
              type="text"
              id="postalAddress"
              name="postalAddress"
              value={values.postalAddress}
              onChange={(e) =>
                setValues({ ...values, postalAddress: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              name="gender"
              value={values.gender}
              onChange={(e) =>
                setValues({ ...values, gender: e.target.value })
              }
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="basicPay">Basic Pay:</label>
            <input
              type="number"
              id="basicPay"
              name="basicPay"
              value={values.basicPay}
              onChange={(e) =>
                setValues({ ...values, basicPay: e.target.value })
              }
            />
          </div>
          
          <button className="update_btn">Update</button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
