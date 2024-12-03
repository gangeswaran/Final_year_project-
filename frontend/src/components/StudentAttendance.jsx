import React, { useState } from "react";
import axios from "axios";
import "../styles/StudentAttendance.css";


const StudentAttendance = () => {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");
  const [latitude, setLatitude] = useState(10.777877887283086); // Default College Lat
  const [longitude, setLongitude] = useState(78.72046707285774); // Default College Long
  const [isWithinArea, setIsWithinArea] = useState(false);

  const targetCoordinates = [
    { lat:10.777877887283086, lng:  78.72046707285774 },
    { lat: 10.777879044119993, lng: 78.72053772949154},
    { lat: 10.777779556130456, lng:  78.7205424399338},
    { lat: 10.77777149511684,  lng: 78.72046431254645 },
  ];

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setLatitude(userLat);
          setLongitude(userLon);

          let withinArea = false;
          for (let i = 0; i < targetCoordinates.length; i++) {
            const { lat, lng } = targetCoordinates[i];
            const distance = haversineDistance(userLat, userLon, lat, lng);

            if (distance <= 400) { 
              withinArea = true;
              break;
            }
          }
          setIsWithinArea(withinArea);
          alert(withinArea ? "You are within the attendance area!" : "You are not in the attendance area.");
        },
        (error) => {
          alert("Error fetching location.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (status === "present" && !isWithinArea) {
      alert("You are not in the attendance area. Attendance cannot be recorded.");
      return;
    }
  
    const attendanceData = {
      name,
      regNo,
      date,
      status,
      ...(status === "present" && { latitude, longitude }), // Only include location if present
    };
  
    // Send data to API (replace with your actual API endpoint)
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/attendance`, attendanceData)
      .then((response) => {
        alert("Attendance recorded successfully!");
        // Clear form fields
        setName("");
        setRegNo("");
        setDate("");
        setStatus("present");
      })
      .catch((error) => {
        alert("Error recording attendance.");
        console.error(error);
      });
  };
  
  return (
    <div className="attendance-page">
      <h1>Student Attendance</h1>
      <form onSubmit={handleSubmit} className="attendance-form">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Registration Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div className="status-radio">
          <label>
            <input
              type="radio"
              name="status"
              value="present"
              checked={status === "present"}
              onChange={() => {
              setStatus("present");
              setIsWithinArea(false);}}
            />
            Present
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="absent"
              checked={status === "absent"}
              onChange={() => {
                setStatus("absent");
                setIsWithinArea(false); // Clear location check
              }}            />
            Absent
          </label>
        </div>
        <div className="location-info">
  {status === "present" && (
    <>
      <button id="btnloc" type="button" onClick={getLocation}>Get Location</button>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      {isWithinArea ? (
        <p style={{ color: "green" }}>You are in the attendance area.</p>
      ) : (
        <p style={{ color: "red" }}>Not in the attendance area.</p>
      )}
    </>
  )}
  {status === "absent" && (
    <p style={{ color: "blue" }}>Location is not required for marking absent.</p>
  )}
</div>

        <button type="submit" className="submit-btn">Submit Attendance</button>
      </form>
    </div>
  );
};

export default StudentAttendance;
