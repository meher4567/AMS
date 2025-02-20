import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';    // HomePage component
import LoginAdmin from './pages/LoginAdmin'; // Admin login component
import AdminRoutes from './routes/AdminRoutes'; // Admin routes for nested navigation
import LoginUser from './pages/LoginUser';
import UserRoutes from './routes/UserRoutes';
import ThankYouPage from './user/pages/ThankYouPage';

const App = () => {
    return (
        <Routes>
            {/* Shared routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/login-user" element={<LoginUser />} />
            {/* Admin routes */}
            <Route path="/admin-home/*" element={<AdminRoutes />} />  {/* Nested admin routes */}
            {/* User routes */}
            <Route path="/user-home/*" element={<UserRoutes />} />  {/* Nested admin routes */}
            <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
    );
};

export default App;
