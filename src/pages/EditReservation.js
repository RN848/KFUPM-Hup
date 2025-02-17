// src/pages/EditReservation.jsx

import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Body from "../components/Body";
import "../styles/pages/_editReservation.scss";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios"; // Import axios directly
import { toast } from "react-toastify";

const EditReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Assuming route is /edit-reservation/:id

  const [reservation, setReservation] = useState(location.state?.reservation || null);
  const [formData, setFormData] = useState({
    sport: "",
    field: "",
    day: "",
    time: "",
    studentsNeeded: 1,
    isPublic: true,
    code: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reservation) {
      fetchReservation();
    } else {
      setFormData({
        sport: reservation.sport,
        field: reservation.field,
        day: reservation.day,
        time: reservation.time,
        studentsNeeded: reservation.studentsNeeded,
        isPublic: reservation.isPublic,
        code: reservation.code,
      });
    }
    // eslint-disable-next-line
  }, [reservation]);

  const fetchReservation = async () => {
    try {
      const url = `http://localhost:5001/api/reservations/${encodeURIComponent(id)}`;
      const response = await axios.get(url);
      setReservation(response.data);
      setFormData({
        sport: response.data.sport,
        field: response.data.field,
        day: response.data.day,
        time: response.data.time,
        studentsNeeded: response.data.studentsNeeded,
        isPublic: response.data.isPublic,
        code: response.data.code,
      });
    } catch (error) {
      console.error("Error fetching reservation:", error);
      toast.error("Failed to fetch reservation details.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5001/api/reservations/${encodeURIComponent(id)}`;
      await axios.put(url, formData);

      toast.success("Reservation updated successfully.");
      navigate(`/reservation-details/${id}`, { state: { isOwnerView: true } });
    } catch (error) {
      console.error("Error updating reservation:", error);
      setError(error.response?.data?.message || "Failed to update reservation.");
      toast.error(error.response?.data?.message || "Failed to update reservation.");
    }
  };

  if (!reservation) {
    return <Body><div>Loading...</div></Body>;
  }

  return (
    <Body>
      <div className="edit-reservation">
        <h2>Edit Reservation</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSave}>
          <Form.Group controlId="sport">
            <Form.Label>Sport</Form.Label>
            <Form.Control
              type="text"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              required
              disabled // Sport shouldn't be changed
            />
          </Form.Group>

          <Form.Group controlId="field">
            <Form.Label>Field</Form.Label>
            <Form.Control
              as="select"
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
            >
              <option value="">Select Field</option>
              {/* Populate with actual fields or use dynamic data if available */}
              <option value="Field 1">Field 1</option>
              <option value="Field 2">Field 2</option>
              <option value="Field 3">Field 3</option>
              <option value="Field 4">Field 4</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="day">
            <Form.Label>Day</Form.Label>
            <Form.Control
              as="select"
              name="day"
              value={formData.day}
              onChange={handleChange}
              required
            >
              <option value="">Select Day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="studentsNeeded">
            <Form.Label>Students Needed</Form.Label>
            <Form.Control
              type="number"
              name="studentsNeeded"
              value={formData.studentsNeeded}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>

          <Form.Group controlId="isPublic">
            <Form.Check
              type="checkbox"
              label="Public Reservation"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="code">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Unique code for reservation"
              disabled // Code shouldn't be changed
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: "1em" }}>
            Save Changes
          </Button>
        </Form>
      </div>
    </Body>
  );
};

export default EditReservation;
