import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:4000/api/clubRoute"; // Adjust to your actual API URL

// Fetch all clubs
export const getAllClubs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching clubs:", error);
        throw error;
    }
};

// Fetch a single club by ID
export const getClubById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching club with ID ${id}:`, error);
        throw error;
    }
};

// Create a new club
export const createClub = async (clubData) => {
    try {
        const response = await axios.post(API_URL, clubData);
        return response.data;
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
    }
};

// Update an existing club by ID
export const updateClub = async (id, clubData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, clubData);
        return response.data;
    } catch (error) {
        console.error(`Error updating club with ID ${id}:`, error);
        throw error;
    }
};

// Delete a club by ID
export const deleteClub = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting club with ID ${id}:`, error);
        throw error;
    }
};
