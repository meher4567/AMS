import { useState } from 'react';
import Navbar from './Navbar'; // Adjust the path as necessary
import Airlines from './Airlines'; // Import Airlines component
import Airports from './Airports'; // Import Airports component
import Bookings from './Bookings'; // Import Bookings component
import Crew from './Crew'; // Import Crew component
import Flights from './Flights'; // Import Flights component
import Passengers from './Passengers'; // Import Passengers component
import Planes from './Planes'; // Import Planes component
import Tickets from './Tickets'; // Import Tickets component
import Payments from './Payments'; // Import Payments component
import CrewAssignment from './CrewAssignment'

const AdminHome = () => {
    const [activePage, setActivePage] = useState(null); // Start with null

    const renderContent = () => {
        if (!activePage) return null; // Render nothing if activePage is null

        switch (activePage) {
            case 'airlines':
                return <Airlines />;
            case 'airports':
                return <Airports />;
            case 'bookings':
                return <Bookings />;
            case 'crew':
                return <Crew />;
            case 'crew-assignment':
                return <CrewAssignment />;
            case 'flights':
                return <Flights />;
            case 'passengers':
                return <Passengers />;
            case 'planes':
                return <Planes />;
            case 'tickets':
                return <Tickets />;
            case 'payments':
                return <Payments />;
            default:
                return null; // In case of an unexpected value
        }
    };

    return (
        <div>
            <Navbar setActivePage={setActivePage} /> {/* Pass setActivePage to Navbar */}
            <main>
                {renderContent()} {/* Render the corresponding page based on activePage */}
            </main>
        </div>
    );
};

export default AdminHome;
