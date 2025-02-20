import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index4.module.scss';

// Import all CRUD components for Crew
import CreateCrew from './AddCrew';
import ReadCrew from './ViewCrew';
import UpdateCrew from './EditCrew';
import DeleteCrew from './DeleteCrew';
import SearchCrew from './SearchCrew';

const Index4 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-crew')}>Create Crew</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-crew')}>Read Crew</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-crew')}>Update Crew</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-crew')}>Delete Crew</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-crew')}>Search Crew</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-crew" element={<CreateCrew />} />
        <Route path="read-crew" element={<ReadCrew />} />
        <Route path="update-crew" element={<UpdateCrew />} />
        <Route path="delete-crew" element={<DeleteCrew />} />
        <Route path="search-crew" element={<SearchCrew />} />
      </Routes>
    </div>
  );
};

export default Index4;
