import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const response = await axios.post("http://localhost:5010/auth/register", {
        name,
        username: userName,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="admin-signup-container">
      <h1>Admin Signup</h1>

      {/* Name Field */}
      <div className="form-field">
        <label>
          Name <span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Username Field */}
      <div className="form-field">
        <label>
          Username <span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

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
        Signup
      </button>
    </div>
  );
};

export default Signup;
