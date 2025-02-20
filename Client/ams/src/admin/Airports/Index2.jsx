
import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index2.module.scss';

// Import all CRUD components for Airports
import CreateAirport from './AddAirport';
import ReadAirport from './ViewAirports';
import UpdateAirport from './EditAirport';
import DeleteAirport from './DeleteAirport';
import SearchAirports from './SearchAirports';

const Index2 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-airport')}>Create Airport</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-airport')}>Read Airports</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-airport')}>Update Airport</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-airport')}>Delete Airport</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-airports')}>Search Airports</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-airport" element={<CreateAirport />} />
        <Route path="read-airport" element={<ReadAirport />} />
        <Route path="update-airport" element={<UpdateAirport />} />
        <Route path="delete-airport" element={<DeleteAirport />} />
        <Route path="search-airports" element={<SearchAirports />} />
      </Routes>
    </div>
  );
};

export default Index2;
