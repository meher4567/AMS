import { useState, useEffect } from 'react';
import { getPlanes, deletePlane } from '../../api/planesApi'; // Adjust the import based on your file structure
import styles from '../styles/Planes/Delete.module.scss';

const DeletePlane = () => {
  const [planeId, setPlaneId] = useState('');
  const [planes, setPlanes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all planes initially to have a mapping between planeId and id
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await getPlanes();
        setPlanes(response);
      } catch (error) {
        console.error('Error fetching planes:', error);
      }
    };
    fetchPlanes();
  }, []);

  const handleDelete = async () => {
    setError('');
    setSuccess('');

    const planeToDelete = planes.find((plane) => plane.plane_id === parseInt(planeId));

    if (!planeToDelete) {
      setError('Plane not found');
      return;
    }

    try {
      await deletePlane(planeId);
      setSuccess(`Plane with ID ${planeId} deleted successfully`);
      setPlaneId('');
      setPlanes(planes.filter((plane) => plane.id !== planeToDelete.id));
    } catch (error) {
      setError('Error deleting plane');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Delete Plane</h2>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <label>Plane ID:</label>
      <input
        type="text"
        value={planeId}
        onChange={(e) => setPlaneId(e.target.value)}
        placeholder="Enter Plane ID"
        className={styles.input}
      />
      <button onClick={handleDelete} className={styles.deleteButton}>Delete Plane</button>
    </div>
  );
};

export default DeletePlane;
