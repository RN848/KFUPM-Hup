import axios from 'axios';

// Base URL for the API
const API_URL = "http://localhost:5001/api/clubRoute"; // Adjust to your actual API URL

// Helper function to get the auth token (from local storage)
const getAuthToken = () => localStorage.getItem("token");

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
        const response = await axios.post(API_URL, clubData,  {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
    }
};

// Update an existing club by ID
export const updateClub = async (clubId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${clubId}`, updatedData, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating club with ID ${clubId}:`, error);
        throw error;
    }
};

// Delete a club by ID
export const deleteClub = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting club with ID ${id}:`, error);
        throw error;
    }
};

// Fetch all members of a club
export const fetchClubMembers = async (clubId) => {
    try {
        const response = await axios.get(`${API_URL}/${clubId}/members`);
        return response.data; // Assuming response.data contains array of members
    } catch (error) {
        console.error(`Error fetching members for club ID ${clubId}:`, error);
        throw error;
    }
};

// Add a new member to the club
export const addMemberToClub = async (clubId, memberId) => {
    try {
        const response = await axios.post(
            `${API_URL}/${clubId}/members`,
            { memberId },
            { headers: { Authorization: `Bearer ${getAuthToken()}` } }
        );
        return response.data; // Returns updated members list or success message
    } catch (error) {
        console.error(`Error adding member to club ID ${clubId}:`, error);
        throw error;
    }
};

// Remove a member from the club
export const removeMemberFromClub = async (clubId, memberId) => {
    try {
        const response = await axios.delete(
            `${API_URL}/${clubId}/members/${memberId}`,
            { headers: { Authorization: `Bearer ${getAuthToken()}` } }
        );
        return response.data; // Returns updated members list or success message
    } catch (error) {
        console.error(`Error removing member from club ID ${clubId}:`, error);
        throw error;
    }
};

// Fetch all activities of a club
export const fetchClubActivities = async (clubId) => {
    try {
        const response = await axios.get(`${API_URL}/${clubId}/activities`);
        return response.data; // Assuming the response data is an array of activities
    } catch (error) {
        console.error(`Error fetching activities for club ID ${clubId}:`, error);
        throw error;
    }
};
// Add an event to a club
export const addEventToClub = async (clubId, eventId) => {
    try {
        const response = await axios.patch(`${API_URL}/add-event`, { clubId, eventId });
        return response.data;
    } catch (error) {
        console.error(`Error adding event ${eventId} to club ${clubId}:`, error);
        throw error;
    }
};