import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index6.module.scss';

// Import all CRUD components for Passengers
import CreatePassenger from './CreatePassenger';
import ReadPassenger from './ViewPassengers';
import UpdatePassenger from './UpdatePassenger';
import DeletePassenger from './DeletePassenger';
import SearchPassengers from './SearchPassengers';

const Index6 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-passenger')}>Create Passenger</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-passenger')}>Read Passengers</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-passenger')}>Update Passenger</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-passenger')}>Delete Passenger</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-passenger')}>Search Passengers</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-passenger" element={<CreatePassenger />} />
        <Route path="read-passenger" element={<ReadPassenger />} />
        <Route path="update-passenger" element={<UpdatePassenger />} />
        <Route path="delete-passenger" element={<DeletePassenger />} />
        <Route path="search-passenger" element={<SearchPassengers />} />
      </Routes>
    </div>
  );
};

export default Index6;
