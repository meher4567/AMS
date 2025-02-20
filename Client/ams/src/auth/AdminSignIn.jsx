import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminSignIn.module.scss'; // Import the CSS Module

const AdminSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleAdminSignIn = (e) => {
        e.preventDefault();
        // Check for credentials
        if (username === '1' && password === '1') {
            // Redirect to AdminHome page
            navigate('/admin-home'); // Adjust the path as needed
            setErrorMessage(''); // Clear any previous error message
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div className={styles['signin-container']}>
            <h1 className={styles['signin-title']}>Welcome Admin</h1>
            <br/>
            <br/>
            <form className={styles['signin-form']} onSubmit={handleAdminSignIn}>
                <div className={styles['input-group']}>
                    <label className={styles['input-label']}>Username:</label>
                    <input
                        className={styles['input-field']}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles['input-group']}>
                    <label className={styles['input-label']}>Password:</label>
                    <input
                        className={styles['input-field']}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles['signin-button']}>Sign In</button>
                {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AdminSignIn;
