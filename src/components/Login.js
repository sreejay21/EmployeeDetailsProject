import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { loginSuccess } from "../store/authSlice"; 
import { useNavigate } from "react-router-dom";
import './Login.css'
const Login = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate()
  const handleLogin = (event) => {
    const data = {
      username: username,
      password: password,
    };
    event.preventDefault();
    fetch( "http://ztraining.zeronetraining.local/api.publish/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials or an error occurred.");
        }
        return response.json();
      })
      .then((data) => {
        const authToken = data.token;
        localStorage.setItem("authToken", authToken);
        dispatch(loginSuccess());
         navigate('/employee')
      })

      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };
  
  return (
    <main>
      <h2>Login</h2>
      <section>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button >Login</button>
         
        </form>
      </section>
    </main>
  );
};

export default Login;