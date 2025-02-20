import { Outlet} from 'react-router-dom';
import AdminNavBar from '../layouts/AdminNavBar';  // The fixed navbar

const AdminHomePage = () => {
    

    return (
        <div>
            {/* Fixed Navbar */}
            <AdminNavBar />

            {/* Main content area where the components will be rendered */}
            <div style={{ marginTop: '60px', padding: '20px' }}>
                <Outlet />  {/* The selected component will be rendered here */}
            </div>
        </div>
    );
};

export default AdminHomePage;
