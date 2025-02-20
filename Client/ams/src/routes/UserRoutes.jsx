import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../pages/UserHomePage';
import UserShowHome from '../pages/UserShowHome';    // Default home page for users
import AboutUs from '../support/AboutUs';            // About Us page
import ContactUs from '../support/ContactUs';        // Contact Us page
import SearchFlights from '../user/Flights/SearchFlights'; // View flights for users
import MyBookings from '../user/pages/MyBookings';   // My Bookings page
import Profile from '../user/pages/Profile';         // Profile page
import Logout from '../pages/LogOut';                // Logout page
import ViewTicket from '../user/Tickets/ViewTickets';
const UserRoutes = () => {
    return (
        <Routes>
            {/* UserHomePage is the layout with the navbar */}
            <Route path="/" element={<UserHomePage />}>
                {/* Default home page */}
                <Route index element={<UserShowHome />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="flights" element={<SearchFlights />} />
                <Route path="bookings" element={<MyBookings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="logout" element={<Logout />} />
                <Route path="view-ticket" element={<ViewTicket />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
