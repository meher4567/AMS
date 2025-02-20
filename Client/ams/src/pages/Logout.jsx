import { useEffect } from 'react';
import styles from '../styles/Logout.module.scss'; // Import the SCSS module

const Logout = () => {
    useEffect(() => {
        // Clear session data and localStorage
        sessionStorage.clear();
        localStorage.clear();
        console.log('User logged out. Session and local storage cleared.');

        // Redirect to the MainPage using a full page reload
        window.location.href = '/'; // Directly load the main page
    }, []);

    return (
        <div className={styles.logoutContainer}>
            <h2 className={styles.message}>Logging Out...</h2>
            <p className={styles.redirectMessage}>You will be redirected to the main page shortly.</p>
        </div>
    );
};

export default Logout;
