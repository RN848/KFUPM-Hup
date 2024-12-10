// src/pages/ClubMembers.js
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/pages/_clubMembers.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Body from "../components/Body";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClubMembers, removeMemberFromClub } from "../api/apiClubService";
import { Spinner, Alert, Modal, Form } from "react-bootstrap";

const ClubMembers = () => {
    const navigate = useNavigate();
    const { clubId } = useParams(); // Get clubId from URL
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling
    const [showModal, setShowModal] = useState(false); // For role change modal
    const [selectedMember, setSelectedMember] = useState(null); // Member selected for role change
    const [newRole, setNewRole] = useState(""); // New role input

    // Fetch members from the backend API on component mount
    useEffect(() => {
        const getMembers = async () => {
            try {
                const fetchedMembers = await fetchClubMembers(clubId);
                setMembers(fetchedMembers);
            } catch (err) {
                console.error("Error fetching members:", err);
                setError(err.message || "Failed to fetch club members. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getMembers();
    }, [clubId]);

    // Handle member removal
    const handleRemove = async (id) => {
        if (window.confirm("Are you sure you want to remove this member?")) {
            try {
                await removeMemberFromClub(clubId, id);
                // Update local state after successful deletion
                setMembers(members.filter((member) => member._id !== id));
            } catch (err) {
                console.error(`Error removing member with ID ${id}:`, err);
                setError(err.message || "Failed to remove member. Please try again.");
            }
        }
    };

    // Open modal to change member role
    const handleChangeRole = (member) => {
        setSelectedMember(member);
        setNewRole(member.role); // Pre-fill with current role
        setShowModal(true);
    };

    // Submit role change

    // Close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMember(null);
        setNewRole("");
        setError(null);
    };

    return (
        <Body>
            <div className="club-members-page container mt-5">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Club Members</h2>
                    <Button variant="primary" onClick={() => navigate(`/club/${clubId}/members/add`)}>
                        Add New Member
                    </Button>
                </header>

                {/* Error Message */}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Loading Spinner */}
                {loading ? (
                    <div className="text-center my-4">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading members...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div className="members-grid row">
                        {members.length === 0 ? (
                            <p>No members found.</p>
                        ) : (
                            members.map((member) => (
                                <div className="member-card col-md-4 mb-4" key={member._id}>
                                    <div
                                        className="card h-100"
                                        onClick={() =>
                                            navigate(`/member-profile/${member._id}`, {
                                                state: { member },
                                            })
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {member.profilePicture ? (
                                            <img
                                                src={member.profilePicture}
                                                alt={`${member.name}'s profile`}
                                                className="card-img-top"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/images/clubMembers/default_member.png"; // Fallback image
                                                }}
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faUserCircle} className="default-icon card-img-top" />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{member.name}</h5>
                                            <p className="card-text">Email: {member.email}</p>
                                            <p className="card-text">Role: {member.role}</p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering card click
                                                    handleChangeRole(member);
                                                }}
                                            >
                                                Change Role
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering card click
                                                    handleRemove(member._id);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Role Change Modal */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Member Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedMember && (
                            <Form>
                                <Form.Group controlId="formMemberName" className="mb-3">
                                    <Form.Label>Member Name</Form.Label>
                                    <Form.Control type="text" value={selectedMember.name} readOnly />
                                </Form.Group>

                                <Form.Group controlId="formNewRole" className="mb-3">
                                    <Form.Label>New Role</Form.Label>
                                    <Form.Select
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                    >
                                        <option value="">Select a role</option>
                                        <option value="Member">Member</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Moderator">Moderator</option>
                                        {/* Add more roles as needed */}
                                    </Form.Select>
                                </Form.Group>

                                {error && <Alert variant="danger">{error}</Alert>}
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Body>
    );
};

export default ClubMembers;

