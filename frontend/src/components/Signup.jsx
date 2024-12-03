import React, { useState } from "react";
import "../styles/Signup.css";

const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const renderSignupForm = () => {
    return (
      <div className="signup-form">
        <h2>{selectedRole} Signup</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {selectedRole === "student" && (
            <input type="text" placeholder="Student ID" required />
          )}
          {selectedRole === "teacher" && (
            <input type="text" placeholder="Teacher ID" required />
          )}
          {selectedRole === "principal" && (
            <input type="text" placeholder="College Code" required />
          )}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    );
  };

  return (
    <div className="signup-page">
      <h1>Select Your Role For Sign Up</h1>
      <div className="role-buttons">
        <button
          onClick={() => setSelectedRole("teacher")}
          className={selectedRole === "teacher" ? "active" : ""}
        >
          Teacher
        </button>
        <button
          onClick={() => setSelectedRole("principal")}
          className={selectedRole === "principal" ? "active" : ""}
        >
          Principal
        </button>
        <button
          onClick={() => setSelectedRole("student")}
          className={selectedRole === "student" ? "active" : ""}
        >
          Student
        </button>
      </div>
      {selectedRole && <div className="signup-container">{renderSignupForm()}</div>}
    </div>
  );
};

export default SignupPage;
