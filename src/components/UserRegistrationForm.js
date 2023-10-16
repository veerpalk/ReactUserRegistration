import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaLock, FaPhone, FaIdBadge } from 'react-icons/fa';
import './UserRegistrationForm.css';
import BabylonModel from './BabylonModel';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';



function UserRegistrationForm(props) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  
    const location = useLocation();
    const { user, mode } = location.state || {};
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: user ? user.fullName : '',
        email: user ? user.email : '',
        phoneNumber: user ? user.phoneNumber : '',
        username: user ? user.username : '',
        password: '', 
        confirmPassword: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (async (e) => 
    {
        e.preventDefault();
        setIsLoading(true);
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Exclude confirmPassword
        const { confirmPassword, ...dataToSubmit } = formData;

        // Log the form data
        for (const key in dataToSubmit) {
            console.log("Form Data:", key + " " + dataToSubmit[key]);
        }
        console.log("formData", formData);

        const raw = JSON.stringify(dataToSubmit);
        console.log("formDataObject", dataToSubmit);
        console.log("Request Body:", raw);

        const requestOptions = {
            method: mode === 'edit' ? 'PUT' : 'POST', 
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const apiUrl = mode === 'edit' 
        ? `http://localhost:9090/updateUser/${user.id}` 
        : 'http://localhost:9090/addUser';


        const response = {};
        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                setError("Network error: Failed to fetch. Please check your connection and try again.");
               // throw new Error("Network response was not ok");
            }
            const textResult = await response.text();
            toast.success(textResult);
            navigate('/all-users'); 
            setIsLoading(false); 
        } catch (error) {
            setIsLoading(false); 
            try {
                if (response.ok && response.headers.get('content-type').includes('application/json')) {
                const result = await response.json();
                if (!response.ok)
                   { toast.error(result.message);
                    setError(result.message);
                }
               else toast.success(result.message);
               navigate('/all-users'); 
            }
            else {
                setError("Network error: Failed to fetch. Please check your connection and try again.");
                toast.error("Network error"); 
            }
            } catch (error) {
                let errorMessage;
                if (error.message.includes('Failed to fetch')) {
                    errorMessage = "Network error: Failed to fetch. Please check your connection and try again.";
                } else if (error.message.includes('Not Found')) {
                    errorMessage = "The requested URL was not found.";
                } else if (error.message.includes('CORS')) {
                    errorMessage = "CORS (Cross-Origin Resource Sharing) issue detected.";
                } else {
                    console.error('Error:', error);
                    toast.error(error.message || "An unknown error occurred. Please try again later.");
                } 
                setError(errorMessage);
                toast.error(errorMessage);
            }
        }
    });

    return (
        <div className="signup-form-container">
            
            {isLoading && 
            <div className="loader-container">
                <img src="../assets/loader.gif" alt="Loading..." className="loader"/>
            </div>
            }

             {error ? (
            <ErrorPage errorMessage={error} />) : 
            (
            <div>
            <div className="signup-header">
                {/* <h1>ADsologist</h1> */}
                <BabylonModel />
            </div>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="input-group">
                    <FaIdBadge className="icon" />
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaPhone className="icon" />
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{mode === "edit" ? "Update" : "Register"}</button>
                <p>Already have an account? <a href="#">Log In</a></p>
            </form>
            </div>
            )}
        </div>
    );
}

export default UserRegistrationForm;
