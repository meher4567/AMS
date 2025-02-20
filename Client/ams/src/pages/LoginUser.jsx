import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import styles from '../styles/LoginUser.module.scss';

const LoginUser = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();
    

    const handleSignInSuccess = () => {
        navigate('/user-home');
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['form-wrapper']}>
                {isSignIn ? (
                    <SignIn onSuccess={handleSignInSuccess} />
                ) : (
                    <SignUp />
                )}
                <button onClick={() => setIsSignIn(!isSignIn)} className={styles['toggle-button']}>
                    {isSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
                </button>
            </div>
        </div>
    );
};

export default LoginUser;
