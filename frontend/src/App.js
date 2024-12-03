import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/Signup';
import StudentAttendance from './components/StudentAttendance';
import LandingPage from './components/LandPage';
import Navbar from './components/Navbar';


function App() {
  return (
  
    <Router>
        <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='student-attendance' element={<StudentAttendance />} />
      </Routes>
    </Router>

  );
}

export default App;
