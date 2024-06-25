import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { ToastContainer, toast, Slide } from 'react-toastify';

// Define the base URL using environment variables
const baseUrl = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;
// Define the endpoint
const endpoint = '/login';

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if access token is present in local storage
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
    // console.log("me", userType);
    // console.log("User ID in user dashboard", userId);

    if (!userId || !accessToken) {
      // Redirect to login page if userId or accessToken is missing
      // navigate("/login");
      console.log("not login");
    } else {
      if (userType === "user") {
        // Redirect to UserDashboard.js if userType is 'user'
        navigate("/UserDashboard");
      } else if (userType === "reviewer") {
        // Redirect to the home page for other user types
        navigate("/reviewer");
      } else if (userType === "college") {
        // Redirect to the home page for other user types
        navigate("/collegedashboard");
      } else if (userType === "lecturer") {
        // Redirect to the home page for other user types
        navigate("/lecturer");
      } else if (userType === "admin") {
        // Redirect to the home page for other user types
        navigate("/admindashboard");
      } else if (userType === "dev") {
        // Redirect to the home page for other user types
        navigate("/home");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: usernameInput, password: passwordInput }),
      });

      const data = await response.json();

      if (response.status === 202) {
        toast.error(data.message);
        return;
      }

      if (response.ok) {
        toast.success('Login Successful');
        const { userId, userType, accessToken, refreshToken } = data;

        localStorage.setItem('userId', userId);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userType', userType);

        switch (userType) {
          case 'user':
            navigate('/UserDashboard');
            break;
          case 'reviewer':
            navigate('/reviewer');
            break;
          case 'college':
            navigate('/collegedashboard');
            break;
          case 'lecturer':
            navigate('/lecturer');
            break;
          case 'admin':
            navigate('/admindashboard');
            break;
          case 'dev':
            navigate('/home');
            break;
          default:
            navigate('/');
        }
      } else {
        toast.error(data.message || 'Invalid Username or Password');
      }
    } catch (error) {
      toast('Error Logging in');
      console.error('Error occurred:', error);
    navigate("/dashboard");

    }
  };

  return (
    <div className="loginContainer" >
      <div className="loginDivider">
        <div className="loginLeftContainer">
          <h2 className="loginHereText">Login Here !</h2>
          <form className="loginForm" onSubmit={handleLogin}>
            {/* <div htmlFor="username">Username</div> */}
            <div className="loginInputLabel">Username</div>
            <input
              className="loginInputText"
              type="text"
              id="username"
              // placeholder="Enter Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
            {/* <div htmlFor="password">Password</div> */}
            <div className="loginInputLabel">Password</div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={passwordInput}
              // placeholder="Enter Password"
              className="loginInputText"
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />

            <input
              id="check"
              type="checkbox"
              className="showPassword"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <span className="showPassword">Show Password</span>
            <button className="loginButton" type="submit">
              Login
            </button>
          </form>

        </div>
        <div className="loginRightContainer">
          <div className="loginRightSideContent">
            <div className="lockIconLogin"><LockOutlinedIcon fontSize="large" /></div>
            <h5>Welcome to </h5>
            <h1> Exam Tech!</h1>
            <div className="login-tagline">LEARN - PRACTICE - SUCCEED</div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default Login;