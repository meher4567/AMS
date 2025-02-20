import { Outlet } from 'react-router-dom';
import UserNavBar from '../layouts/UserNavbar';  // The fixed navbar

const UserHomePage = () => {

    return (
        <div>
            {/* Fixed Navbar */}
            <UserNavBar />

            {/* Main content area where the components will be rendered */}
            <div style={{ marginTop: '60px', padding: '20px' }}>
                <Outlet />  {/* The selected component will be rendered here */}
            </div>
        </div>
    );
};

export default UserHomePage;
