import { useState } from 'react';
import styles from '../styles/Airlines/Create.module.scss'; // Importing the SCSS module
import { createAirline } from '../../api/airlinesApi'; // Adjust the import based on your file structure

const CreateAirline = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    iata_code: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Creating airline:', formData);
    try {
      const response = await createAirline(formData);
      console.log('Airline created:', response);
      // Optionally reset the form
      setFormData({
        name: '',
        country: '',
        iata_code: '',
      });
    } catch (error) {
      console.error('Error creating airline:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Airline Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter Airline Name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter Country"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>IATA Code:</label>
        <input
          type="text"
          name="iata_code"
          value={formData.iata_code}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter IATA Code (2 letters)"
          required
          maxLength="2"
        />
      </div>

      <button type="submit" className={styles.button}>Create Airline</button>
    </form>
  );
};

export default CreateAirline;
