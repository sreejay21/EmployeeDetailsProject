import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css'

const NavigationBar = ({ handleLogout }) => {
  handleLogout=()=>{
    localStorage.removeItem("authToken")
  }
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/employee/add" className="nav-link">
            Add New Employee
          </Link>
        </li>
        <h1>Employee Details</h1>
        <li>
          <Link to='/' onClick={handleLogout} className="nav-button">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;