import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api`; // Adjust this to your actual API URL
const getAuthToken = () => localStorage.getItem("token");

// Sign-Up User
export const signUpUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/userRoutes/sign-Up`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Update User Profile
export const updateUserProfile = async (updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/userRoutes/profile`, updatedData, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Fetch User Profile
export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/userRoutes/profile`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


export const fetchUserProfileById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/userRoutes/profile/${userId}`);
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Follow a Club
export const followClub = async (clubId) => {
    try {
        const response = await axios.post(
            `${API_URL}/userRoutes/follow-club`,
            { clubId },
            {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Unfollow a Club
export const unfollowClub = async (clubId) => {
    try {
        const response = await axios.post(
            `${API_URL}/userRoutes/unfollow-club`,
            { clubId },
            {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Join an Event
export const joinEvent = async (eventId) => {
    try {
        const response = await axios.post(
            `${API_URL}/userRoutes/join-event`,
            { eventId },
            {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Leave an Event
export const leaveEvent = async (eventId) => {
    try {
        const response = await axios.post(
            `${API_URL}/userRoutes/leave-event`,
            { eventId },
            {
                headers: { Authorization: `Bearer ${getAuthToken()}` },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get Enrolled Clubs
export const getEnrolledClubs = async () => {
    try {
        const response = await axios.get(`${API_URL}/userRoutes/enrolled-clubs`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get Followed Clubs
export const getFollowedClubs = async () => {
    try {
        const response = await axios.get(`${API_URL}/userRoutes/followed-clubs`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Get Joined Events
export const getJoinedEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/userRoutes/joined-events`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

