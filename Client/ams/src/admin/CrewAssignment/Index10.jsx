import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index10.module.scss';

// Import all CRUD components for Crew Assignments
import CreateCrewAssignment from './CreateCrewAssignment';
import ReadCrewAssignments from './ReadCrewAssignments';
import UpdateCrewAssignment from './UpdateCrewAssignment';
import DeleteCrewAssignment from './DeleteCrewAssignment';
import SearchCrewAssignments from './SearchCrewAssignments';

const Index10 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-crew-assignment')}>Create Crew Assignment</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-crew-assignments')}>Read Crew Assignments</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-crew-assignment')}>Update Crew Assignment</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-crew-assignment')}>Delete Crew Assignment</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-crew-assignments')}>Search Crew Assignments</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-crew-assignment" element={<CreateCrewAssignment />} />
        <Route path="read-crew-assignments" element={<ReadCrewAssignments />} />
        <Route path="update-crew-assignment" element={<UpdateCrewAssignment />} />
        <Route path="delete-crew-assignment" element={<DeleteCrewAssignment />} />
        <Route path="search-crew-assignments" element={<SearchCrewAssignments />} />
      </Routes>
    </div>
  );
};

export default Index10;
