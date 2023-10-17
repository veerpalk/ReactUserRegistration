import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './UserLoginForm.css';
import BabylonModel from './BabylonModel';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { API_URL } from '../constants/Constants';

function UserLoginForm() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  
    const location = useLocation();
    const { user, mode } = location.state || {};
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '', 
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (async (e) => 
    {
        e.preventDefault();
        setIsLoading(true);
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Log the form data
        console.log("formData", formData);

        const raw = JSON.stringify(formData);
        console.log("formDataObject", formData);
        console.log("Request Body:", raw);

        const requestOptions = {
            method: 'POST', 
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const apiUrl = API_URL+`/login`;
        
        const response = {};
        try {
            const response = await fetch(apiUrl, requestOptions);   
            setIsLoading(false); 
                if (response.ok && response.headers.get('content-type').includes('application/json')) {
                const result = await response.json();
                if (!response.ok)
                { 
                    toast.error(result.message);
                    setError(result.message);
                }
                else if(result.username==formData.username)
                {
                   navigate('/all-users'); 
                   toast.success("Logged In ...");

                }
                else toast.error("No User Found");
            }
            else {
                const result = await response.json();
                toast.error(result.message); 
            }
            } 
            catch (error) {
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
    });


    return (
        <div className="login-container">
             {isLoading &&  <div className="loader-container">
                <img src="../assets/loader.gif" alt="Loading..." className="loader"/></div>
            }
             {error ? (
            <ErrorPage errorMessage={error} />) : 
            (
            <div>
            <div className="login-header">
                {/* <h1>ADsologist</h1> */}
                <BabylonModel />
            </div>
            <form onSubmit={handleSubmit} className="login-form">
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
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
            )}
        </div>
    );
}


export default UserLoginForm;
