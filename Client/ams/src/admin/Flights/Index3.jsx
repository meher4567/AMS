import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index3.module.scss';

// Import all CRUD components for Flights
import CreateFlight from './AddFlight';
import ReadFlight from './ViewFlights';
import UpdateFlight from './EditFlight';
import DeleteFlight from './DeleteFlight';
import SearchFlights from './SearchFlights';
import FlightCrewAssignment from './FlightCrewAssignment';

const Index3 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-flight')}>Create Flight</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-flight')}>Read Flights</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-flight')}>Update Flight</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-flight')}>Delete Flight</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-flight')}>Search Flights</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('assign-flight')}>Assign To Flight</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-flight" element={<CreateFlight />} />
        <Route path="read-flight" element={<ReadFlight />} />
        <Route path="update-flight" element={<UpdateFlight />} />
        <Route path="delete-flight" element={<DeleteFlight />} />
        <Route path="search-flight" element={<SearchFlights />} />
        <Route path="assign-flight" element={<FlightCrewAssignment />} />
      </Routes>
    </div>
  );
};

export default Index3;
