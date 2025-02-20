import { useState } from 'react';
import { createAirport } from '../../api/airportsApi'; // Adjust the import based on your file structure
import styles from '../styles/Airports/Create.module.scss'; // Import the SCSS module

const CreateAirport = () => {
  const [formData, setFormData] = useState({
    airport_id: '',  // Assuming you're using airport_id for identification
    airport_code: '',
    airport_name: '',
    city: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Creating airport:', formData);
    try {
      const response = await createAirport(formData);
      console.log('Airport created:', response);
      // Optionally reset the form
      setFormData({
        airport_id: '',
        airport_code: '',
        airport_name: '',
        city: '',
        country: ''
      });
    } catch (error) {
      console.error('Error creating airport:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label>Airport ID:</label>
      <input
        type="text"
        name="airport_id"
        value={formData.airport_id}
        onChange={handleChange}
      />
      <label>Airport Code:</label>
      <input
        type="text"
        name="airport_code"
        value={formData.airport_code}
        onChange={handleChange}
      />
      <label>Airport Name:</label>
      <input
        type="text"
        name="airport_name"
        value={formData.airport_name}
        onChange={handleChange}
      />
      <label>City:</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />
      <label>Country:</label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
      />
      <button type="submit">Create Airport</button>
    </form>
  );
};

export default CreateAirport;
