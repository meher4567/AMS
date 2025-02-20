import { Link } from 'react-router-dom';
import styles from '../../styles/ThankYouPage.module.scss'; // Import SCSS module

const ThankYouPage = () => {
    return (
        <div className={styles.thankYouContainer}>
            <h1 className={styles.heading}>Thank You for Your Purchase!</h1>
            <p className={styles.message}>Your payment was successful, and your booking is confirmed.</p>
            
            <div className={styles.buttonGroup}>
                <Link to="/user-home">
                    <button className={styles.button}>Go to Home</button>
                </Link>
                
                <Link to="/user-home/bookings">
                    <button className={styles.button}>View My Bookings</button>
                </Link>
            </div>
        </div>
    );
};

export default ThankYouPage;
