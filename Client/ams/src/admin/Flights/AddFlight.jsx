import { useState } from 'react';
import { createFlight } from '../../api/flightsApi'; // Adjust the import based on your file structure
import styles from '../styles/Flights/Create.module.scss'; // Import specific SCSS for Create

const CreateFlight = () => {
  const [formData, setFormData] = useState({
    flight_no: '',
    airline_id: '',
    departure_time: '',
    arrival_time: '',
    origin_airport: '',
    destination_airport: ''
  });

  const [error, setError] = useState('');  // For form validation errors
  const [success, setSuccess] = useState(false);  // To track submission success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { flight_no, airline_id, departure_time, arrival_time, origin_airport, destination_airport } = formData;

    // Basic form validation
    if (!flight_no || !airline_id || !departure_time || !arrival_time || !origin_airport || !destination_airport) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await createFlight(formData);  // API call
      console.log('Flight created:', response);
      setSuccess(true);

      // Reset form after successful submission
      setFormData({
        flight_no: '',
        airline_id: '',
        departure_time: '',
        arrival_time: '',
        origin_airport: '',
        destination_airport: ''
      });
    } catch (error) {
      console.error('Error creating flight:', error);
      setError('Failed to create flight. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Flight</h2>
      {error && <p className={styles.error}>{error}</p>}  {/* Display errors */}
      {success && <p className={styles.success}>Flight created successfully!</p>}  {/* Success message */}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Flight No:</label>
        <input
          type="text"
          name="flight_no"
          value={formData.flight_no}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Airline ID:</label>
        <input
          type="text"
          name="airline_id"
          value={formData.airline_id}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Departure Time:</label>
        <input
          type="datetime-local"
          name="departure_time"
          value={formData.departure_time}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Arrival Time:</label>
        <input
          type="datetime-local"
          name="arrival_time"
          value={formData.arrival_time}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Origin Airport:</label>
        <input
          type="text"
          name="origin_airport"
          value={formData.origin_airport}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Destination Airport:</label>
        <input
          type="text"
          name="destination_airport"
          value={formData.destination_airport}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Create Flight</button>
      </form>
    </div>
  );
};

export default CreateFlight;
