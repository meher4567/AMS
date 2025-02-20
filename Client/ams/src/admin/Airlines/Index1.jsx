
import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index1.module.scss';

// Import all CRUD components for Airlines
import CreateAirline from './AddAirline';
import ReadAirline from './ViewAirlines';
import UpdateAirline from './EditAirline';
import DeleteAirline from './DeleteAirline';
import SearchAirlines from './SearchAirlines';

const Index1 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the relative path
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-airline')}>Create Airline</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-airline')}>Read Airlines</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-airline')}>Update Airline</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-airline')}>Delete Airline</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-airline')}>Search Airline</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-airline" element={<CreateAirline />} />
        <Route path="read-airline" element={<ReadAirline />} />
        <Route path="update-airline" element={<UpdateAirline />} />
        <Route path="delete-airline" element={<DeleteAirline />} />
        <Route path="search-airline" element={<SearchAirlines />} />
      </Routes>
    </div>
  );
};

export default Index1;
