// src/pages/MainPage.js
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/login-admin'); // Redirect to Admin Login
    };

    const handleUserClick = () => {
        navigate('/login-user'); // Redirect to User Login
    };

    return (
        <div>
            <h1>Welcome to the Airline Management System</h1>
            <p>Please select your role:</p>
            <button onClick={handleAdminClick}>Admin</button>
            <button onClick={handleUserClick}>User</button>
        </div>
    );
};

export default MainPage;
