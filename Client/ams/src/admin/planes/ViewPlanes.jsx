import { useEffect, useState } from 'react';
import { getPlanes } from '../../api/planesApi'; // Adjust the import based on your file structure
import styles from '../styles/Planes/Read.module.scss'; // Import specific SCSS for Read

const ReadPlane = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await getPlanes(); // Use the API to fetch data
        setPlanes(response); // Set planes from the response
      } catch (error) {
        console.error('Error fetching planes:', error); // Handle any errors
      }
    };
    fetchPlanes();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Planes List</h2>
      <table className={styles.planeTable}>
        <thead>
          <tr>
            <th>Plane ID</th>
            <th>Model</th>
            <th>Capacity</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {planes.map(plane => (
            <tr key={plane.plane_id}>
              <td>{plane.plane_id}</td>
              <td>{plane.model}</td>
              <td>{plane.capacity}</td>
              <td>{plane.manufacturer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadPlane;
