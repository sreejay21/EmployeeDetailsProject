import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import NavigationBar from "./Navigation";
import { getAuthToken } from "../util/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./EmployeeList.css";
const EmployeeList = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [employee, setEmployees] = useState([]);
    const navigate = useNavigate();
      const token = getAuthToken();


    useEffect(() => {
        // Fetch employee data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://ztraining.zeronetraining.local/api.publish/api/employee",
                    {
                        method: "GET",
                        headers: {
                          Authorization: "Bearer " + token,
                        },
                    }
                );
                const data = await response.json();
                setEmployees(data);
            } catch (error) {

            }
        };

        fetchData();
    }, []);



    return (
        <>
            <div >
                <div>
                <NavigationBar/>
                </div>
                
                <div className="employee-list">
                    { employee.map((employee) => (
                        <EmployeeCard key={employee.employeeID} employee={employee}  />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EmployeeList;
