import { useState, useEffect } from 'react';
import { updatePlane, getPlanes } from '../../api/planesApi';
import styles from '../styles/Planes/Update.module.scss';

const UpdatePlane = () => {
  const [planeId, setPlaneId] = useState('');
  const [formData, setFormData] = useState({
    model: '',
    capacity: '',
    manufacturer: ''
  });
  const [planes, setPlanes] = useState([]);

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

  useEffect(() => {
    if (planeId) {
      const planeToUpdate = planes.find(p => p.plane_id === parseInt(planeId));
      if (planeToUpdate) {
        setFormData(planeToUpdate);
      } else {
        console.error('Plane not found');
      }
    }
  }, [planeId, planes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating plane:', formData);

    const planeToUpdate = planes.find(p => p.plane_id === parseInt(planeId));

    if (!planeToUpdate) {
      console.error('Plane not found');
      return;
    }

    try {
      const response = await updatePlane(planeId, formData);
      console.log('Plane updated:', response);
      setPlaneId('');
      setFormData({ model: '', capacity: '', manufacturer: '' });
    } catch (error) {
      console.error('Error updating plane:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Plane</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Plane ID:</label>
        <input
          type="text"
          value={planeId}
          onChange={(e) => setPlaneId(e.target.value)}
          placeholder="Enter Plane ID"
          className={styles.input}
        />
        <label className={styles.label}>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className={styles.input}
        />
        <label className={styles.label}>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          className={styles.input}
        />
        <label className={styles.label}>Manufacturer:</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Update Plane</button>
      </form>
    </div>
  );
};

export default UpdatePlane;
