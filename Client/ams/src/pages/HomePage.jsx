import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.scss';

const HomePage = () => {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/login-admin');
    };

    const handleUserClick = () => {
        navigate('/login-user');
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>Welcome to the Airline Management System</h1>
            <p className={styles.subtitle}>Please select your role:</p>
            <button className={styles.button} onClick={handleAdminClick}>Admin</button>
            <button className={styles.button} onClick={handleUserClick}>User</button>
        </div>
    );
};

export default HomePage;
