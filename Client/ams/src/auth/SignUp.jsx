import { useState } from 'react';
import { signUp } from '../api/registerapi';
import styles from '../styles/SignUp.module.scss';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await signUp(username, email, password);
            console.log('Sign-up successful:', response);
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['signup-container']}>
            <form className={styles['signup-form']} onSubmit={handleSignUp}>
                <h2 className={styles['form-title']}>Sign Up</h2>
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
                    <label className={styles['input-label']}>Email:</label>
                    <input
                        className={styles['input-field']}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className={styles['input-group']}>
                    <label className={styles['input-label']}>Confirm Password:</label>
                    <input
                        className={styles['input-field']}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles['signup-button']} disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignUp;
