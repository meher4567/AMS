import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index8.module.scss';

// Import all CRUD components for Planes
import CreatePlane from './CreatePlane';
import ReadPlane from './ViewPlanes';
import UpdatePlane from './UpdatePlane';
import DeletePlane from './DeletePlane';
import SearchPlanes from './SearchPlanes';

const Index8 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-plane')}>Create Plane</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-plane')}>Read Planes</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-plane')}>Update Plane</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-plane')}>Delete Plane</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-plane')}>Search Planes</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-plane" element={<CreatePlane />} />
        <Route path="read-plane" element={<ReadPlane />} />
        <Route path="update-plane" element={<UpdatePlane />} />
        <Route path="delete-plane" element={<DeletePlane />} />
        <Route path="search-plane" element={<SearchPlanes />} />
      </Routes>
    </div>
  );
};

export default Index8;
