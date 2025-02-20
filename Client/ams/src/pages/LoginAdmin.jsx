import { useNavigate } from 'react-router-dom';
import AdminSignIn from '../auth/AdminSignIn';

const LoginAdmin = () => {
    const navigate = useNavigate();

    const handleSignInSuccess = () => {
        // Redirect the admin to the admin home page after successful login
        navigate('/admin-home');
    };

    return (
        <div>
            {/* Pass the handleSignInSuccess to your AdminSignIn component */}
            <AdminSignIn onSuccess={handleSignInSuccess} />
        </div>
    );
};

export default LoginAdmin;
