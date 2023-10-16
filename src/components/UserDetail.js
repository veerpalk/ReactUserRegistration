import React from 'react';
import './UserDetail.css';
import { useNavigate } from 'react-router-dom';


function UserDetail({ user }) {
    const navigate = useNavigate();

    const handleBackNavigation = () => {
        window.location.href = "/all-users";
        navigate('/all-users');
    };
    return (
        <div className="user-detail-container">
            <div className="user-detail-card">
                <div className="user-header">
                    <h2 className="user-fullname">{user.fullName}</h2>
                </div>
                <p className="user-username">User Name: {user.username}</p>

                <p className="user-id">ID: {user.id}</p>
                <p className="user-email">Email: {user.email}</p>
                <p className="user-phone">Phone: {user.phoneNumber}</p>
                <button className = "goback" onClick={handleBackNavigation}>Go Back</button>
            </div>
        </div>
    );
}

export default UserDetail;
