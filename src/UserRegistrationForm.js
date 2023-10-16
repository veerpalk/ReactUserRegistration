import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaLock, FaPhone, FaIdBadge } from 'react-icons/fa';
import './UserRegistrationForm.css';
import BabylonModel from './BabylonModel';
import toast from 'react-hot-toast';


function UserRegistrationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        username: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can add logic here for form submission

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Log the form data

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
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        const response = await fetch('http://localhost:9090/addUser', requestOptions);
        try {

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const textResult = await response.text();
            toast.success(textResult);
        } catch (error) {
            try {
                const result = await response.json();
                if (!response.ok)
                    toast.error(result.message);
               else toast.success(result.message);
            } catch (jsonError) {
                console.error('Error:', error);
                toast.error(error.message || "An unexpected error occurred");
            }
        }
    };

    return (
        <div className="signup-form-container">
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
                <button type="submit">Next</button>
                <p>Already have an account? <a href="#">Log In</a></p>
            </form>
        </div>
    );
}

export default UserRegistrationForm;
