import { useState } from 'react';
import { createPlane } from '../../api/planesApi';
import styles from '../styles/Planes/Create.module.scss';

const CreatePlane = () => {
  const [formData, setFormData] = useState({
    model: '',
    capacity: '',
    manufacturer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { model, capacity, manufacturer } = formData;
    if (!model || !capacity || !manufacturer) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await createPlane(formData);
      console.log('Plane created:', response);
      setSuccess(true);

      // Reset form after success
      setFormData({
        model: '',
        capacity: '',
        manufacturer: '',
      });
    } catch (error) {
      console.error('Error creating plane:', error);
      setError('Failed to create plane. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Plane</h2>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Plane created successfully!</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Manufacturer:</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.submitButton}>Create Plane</button>
      </form>
    </div>
  );
};

export default CreatePlane;
