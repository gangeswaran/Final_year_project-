import React, { useState, useEffect } from 'react';
import '../styles/LoginPage.css';
import axios from 'axios';
const LandingPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const roleText = selectedRole ? `${selectedRole} Login` : 'Select Your Role';
    document.getElementById('role').textContent = roleText;
  }, [selectedRole]);

  const renderLoginForm = () => {
    switch (selectedRole) {
      case 'teacher':
        return (
          <div className="login-form">
            <h2>Teacher Login</h2>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <h4>Don't have an account?   <a href='/signup'>Sign up</a></h4>

          </div>
        );
      case 'principal':
        return (
          <div className="login-form">
            <h2>Principal Login</h2>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <h4>Don't have an account?   <a href='/signup'>Sign up</a></h4>

          </div>
        );
      case 'student':
        return (
          <div className="login-form">
            <h2>Student Login</h2>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <h4>Don't have an account?   <a href='/signup'>Sign up</a></h4>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="landing-page">
      <h1 id="role">Select Your Role</h1>
      <div className="role-buttons">
        <button
          onClick={() => setSelectedRole('teacher')}
          className={selectedRole === 'teacher' ? 'active' : ''}
        >
          Teacher
        </button>
        <button
          onClick={() => setSelectedRole('principal')}
          className={selectedRole === 'principal' ? 'active' : ''}
        >
          Principal
        </button>
        <button
          onClick={() => setSelectedRole('student')}
          className={selectedRole === 'student' ? 'active' : ''}
        >
          Student
        </button>
      </div>
      {selectedRole && <div className="login-container">{renderLoginForm()}</div>}
    </div>
  );
};

export default LandingPage;
