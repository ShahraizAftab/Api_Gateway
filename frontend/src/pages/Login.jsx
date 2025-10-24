import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const response = await axios.post("http://localhost:5010/auth/login", {
        email,
        password,
      });
      console.log(response.data.token);
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(localStorage.getItem("token"));
      if (token) {
        navigate("/newpage");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="admin-signup-container">
      <h1>Login Page</h1>

      {/* Email Field */}
      <div className="form-field">
        <label>
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password Field */}
      <div className="form-field">
        <label>
          Password <span className="required">*</span>
        </label>
        <div className="password-wrapper">
          <input
            type={visible ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="toggle-password"
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button className="submit-btn" onClick={submitHandler}>
        Login
      </button>
    </div>
  );
};

export default Login;
