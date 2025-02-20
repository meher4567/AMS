import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/registerApi';
import styles from '../styles/SignIn.module.scss';
import { useUser } from '../components/UserContext';

const SignIn = ({ onSuccess }) => {
    const { setUsername: setUserInContext } = useUser(); // Renamed for clarity
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await signIn(username, password);
            console.log('Sign-in successful:', response);
            
            setUserInContext(username); // Set the username in context
            onSuccess();
        } catch (error) {
            setErrorMessage('Sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['signin-container']}>
            <form className={styles['signin-form']} onSubmit={handleSignIn}>
                <h2 className={styles['form-title']}>Sign In</h2>
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
                <button type="submit" className={styles['signin-button']} disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
                {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignIn;
