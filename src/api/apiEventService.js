import axios from "axios";

// Base URL for the Event API
const API_URL = "http://localhost:4000/api/eventRoute"; // Adjust this to your actual API URL

// Fetch all events
export const getAllEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

// Fetch a single event by ID
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event with ID ${id}:`, error);
        throw error;
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

// Update an existing event by ID
export const updateEvent = async (id, eventData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error(`Error updating event with ID ${id}:`, error);
        throw error;
    }
};

// Delete an event by ID
export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting event with ID ${id}:`, error);
        throw error;
    }
};
