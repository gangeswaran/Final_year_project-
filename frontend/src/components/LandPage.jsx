import React from "react";
import "../styles/LandPage.css"; 
import home from '../home.png'// Import corresponding CSS file for styles

const LandingPage = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Effortless College Management</h1>
        <p className="hero-description">
          Streamline attendance, marks, and student management with ease. Designed for teachers, students, and principals.
        </p>
        <div className="hero-buttons">
          <a href="/features" className="btn btn-secondary">
            Explore Features
          </a>
          <a href="/signup" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img src={home} alt="College Management Dashboard" />
      </div>
    </section>
  );
};

export default LandingPage;
