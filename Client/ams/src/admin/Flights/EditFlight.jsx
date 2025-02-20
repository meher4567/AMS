import { useState, useEffect } from 'react';
import { updateFlight, getFlights } from '../../api/flightsApi'; // Adjust the import based on your file structure
import styles from '../styles/Flights/Update.module.scss'; // Import specific SCSS for Update

const UpdateFlight = () => {
  const [flightId, setFlightId] = useState('');
  const [formData, setFormData] = useState({
    flight_no: '',
    airline_id: '',
    departure_time: '',
    arrival_time: '',
    origin_airport: '',
    destination_airport: ''
  });
  const [flights, setFlights] = useState([]); // Store flights to map flight_id to id
  const [message, setMessage] = useState(''); // For feedback messages

  // Fetch all flights initially
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getFlights();
        setFlights(response);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    fetchFlights();
  }, []);

  // Fetch the flight details based on flight_id input
  useEffect(() => {
    if (flightId) {
      const flightToUpdate = flights.find(f => f.flight_id === parseInt(flightId));

      if (flightToUpdate) {
        setFormData(flightToUpdate); // Populate form with flight details
        setMessage(''); // Clear message if flight is found
      } else {
        setMessage('Flight not found'); // Set message if flight is not found
      }
    } else {
      setFormData({ flight_no: '', airline_id: '', departure_time: '', arrival_time: '', origin_airport: '', destination_airport: '' }); // Clear form
    }
  }, [flightId, flights]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating flight:', formData);

    // Find the flight based on flight_id and update using its `id`
    const flightToUpdate = flights.find(f => f.flight_id === parseInt(flightId));

    if (!flightToUpdate) {
      setMessage('Flight not found');
      return;
    }

    try {
      const response = await updateFlight(flightId, formData); // Use the unique `id` for updating
      console.log('Flight updated:', response);
      setMessage('Flight updated successfully!');
      setFlightId(''); // Reset input after successful update
      setFormData({ flight_no: '', airline_id: '', departure_time: '', arrival_time: '', origin_airport: '', destination_airport: '' }); // Clear form after update
    } catch (error) {
      console.error('Error updating flight:', error);
      setMessage('Error updating flight. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Flight</h2>
      {message && <p className={styles.message}>{message}</p>}  {/* Feedback message */}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Flight ID:</label>
        <input
          type="text"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
          placeholder="Enter Flight ID"
          className={styles.input}
        />
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
        <button type="submit" className={styles.button}>Update Flight</button>
      </form>
    </div>
  );
};

export default UpdateFlight;
