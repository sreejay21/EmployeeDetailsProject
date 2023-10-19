import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import axios from "axios";

const EditEmployee = () => {
  const { employeeID } = useParams();
  const token = getAuthToken();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    employeeID: employeeID,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    personalEmail: "",
    mobileNumber: "",
    postalAddress: "",
    gender: "",
    country: "",
    city: "",
    designation: "",
    basicPay: "",
    needTransportation: null,
    notes:
      "https://tse3.mm.bing.net/th?id=OIP.DAuF8ksdA5Kjh7fLifDpnwHaHa&pid=Api&P=0&h=180",
    username: "",
    password: "",
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
          gender: res.data.gender,
          country: res.data.country,
          city: res.data.city,
          designation: res.data.designation,
          basicPay: res.data.basicPay,
          needTransportation: res.data.needTransportation,
          notes: res.data.notes,
          username: res.data.username,
        });
        console.log(employeeID);
      })
      .catch((err) => console.log(err));
  }, [employeeID]);

  const cancleHandler = () => {
    navigate("/employee");
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://ztraining.zeronetraining.local/api.publish/api/employee/" +
          employeeID,
        values,
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
          dateOfBirth: res.data.dateOfBirth,
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
        alert("Updated Successfully");
        navigate("/employee");
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
              onChange={(e) => setValues({ ...values, gender: e.target.value })}
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
            </select>
          </div>
          <div>
            <div>
              <label htmlFor="city">City:</label>
              <select
                name="city"
                value={values.city}
                onChange={(e) => setValues({ ...values, city: e.target.value })}
              >
                <option value="">Select </option>
                <option value="1">Mumbai</option>
                <option value="2">Pune</option>
                <option value="3">Kerala</option>
              </select>
            </div>
            <div>
              <label htmlFor="country">Country:</label>
              <select
                name="country"
                value={values.country}
                onChange={(e) =>
                  setValues({ ...values, country: e.target.value })
                }
              >
                <option value="">Select </option>
                <option value="1">India</option>
                <option value="2">USA</option>
                <option value="3">NY</option>
              </select>
            </div>
            <div>
              <label htmlFor="designation">Designation:</label>
              <select
                name="designation"
                value={values.designation}
                onChange={(e) =>
                  setValues({ ...values, designation: e.target.value })
                }
              >
                <option value="">Select </option>
                <option value="1">Software Engineer</option>
                <option value="2">Project Manager</option>
                <option value="3">Project Lead</option>
              </select>
            </div>
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
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
          <div className="form-group">
          <label>Need Transportation:</label>
          <input
            type="checkbox"
            name="needTransportation"
          value={values.needTransportation}
           onChange={(e)=>setValues({...values,needTransportation:e.target.checked})}
          />
        </div>
          <div>
            <button className="update_btn">Update</button>
            <button className="cancelBtn" onClick={cancleHandler} type="submit">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
