import { Routes, Route } from 'react-router-dom';
import AdminHomePage from '../pages/AdminHomePage';
import AdminShowHome from '../pages/AdminShowHome';    // Default home page
import AboutUs from '../support/AboutUs';              // About Us page
import ContactUs from '../support/ContactUs';          // Contact Us page
import SearchFlights from '../user/Flights/SearchFlights';
import Stats from '../components/Stats';               // Stats page
import Logout from '../pages/LogOut';                  // Logout page
import AdminHome from '../admin/pages/AdminManagePage';

const AdminRoutes = () => {
    return (
        <Routes>
            {/* AdminHomePage is the layout with the navbar */}
            <Route path="/" element={<AdminHomePage />}>
                {/* Default home page */}
                <Route index element={<AdminShowHome />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="flights" element={<SearchFlights />} />
                <Route path="stats" element={<Stats />} />
                <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/manage-airlines/*" element={<AdminHome />} />
        </Routes>
    );
};

export default AdminRoutes;
