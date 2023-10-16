import React, { useState, useEffect } from 'react';
import './UserList.css';
import ErrorPage from './ErrorPage';
import UserDetail from './UserDetail';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEye, FaPencilAlt , FaTrash} from 'react-icons/fa';
import { API_URL } from '../constants/Constants';

function UserList() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(API_URL+'/users');
                if (response.status === 200) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchUsers();
    }, []);

    const handleView = async (userId) => {
        try {
            const response = await fetch(API_URL+`/user/${userId}`);
            if (response.status === 200) {
                const userData = await response.json();
                setSelectedUser(userData);
            } else {
                setError("Network error: Failed to fetch user details. Please check your connection and try again.");
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error:', error);
            setError("Network error: Failed to fetch. Please check your connection and try again.");
        }
    };

    const handleEdit = (userId) => {
        const user = users.find(user => user.id === userId);
        setSelectedUser(user);
        setEditMode(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const response = {};
            try {
            const response = await fetch(API_URL+`/user/${userId}`, {
                method: 'DELETE',
            });
                if (response.status === 200) {
                    const textResult = await response.text();
                    toast.success(textResult);
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                }
            } catch (error) {
                if (response.ok && response.headers.get('content-type').includes('application/json')) {
                    const textResult = await response.json();
                console.error('Error:', error);
                toast.error(textResult.message);
                }
                setError("Network error: Failed to fetch. Please check your connection and try again.");
                return <ErrorPage errorMessage="Failed to fetch" />;
            }


            
        }
    };

    if (selectedUser && !editMode) {
        return <UserDetail user={selectedUser} />;
    }
    else if (selectedUser && editMode) {
        navigate('/register', { state: { user: selectedUser, mode: "edit" } });
    }

    return (
        <div className="container">

{error ? (<ErrorPage errorMessage={error} />) : (


                <div>
                <h2 className="title">Registered Users</h2>
                {users.length === 0 ? (
                    <p>User List is Empty</p>
                ) : (
                        <ul>
                            {users.map((user) => (
                                <li key={user.id} className="userItem">
                                    <span>{user.fullName} , email:  {user.email}</span>
                                    <div>
                                        
                                        <button className="button" onClick={() => handleView(user.id)}><FaEye/>View</button>
                                        <button className="button" onClick={() => handleEdit(user.id)}><FaPencilAlt/>Edit</button>
                                        <button className="button" onClick={() => handleDelete(user.id)}><FaTrash/>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                   
                )

                }
            </div>
)}
        </div>
    );
}

export default UserList;
