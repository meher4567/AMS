import { useState, useEffect } from 'react';
import { getFlights, deleteFlight } from '../../api/flightsApi'; // Adjust the import based on your file structure
import styles from '../styles/Flights/Delete.module.scss'; // Import specific SCSS for Delete

const DeleteFlight = () => {
  const [flightId, setFlightId] = useState('');
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all flights initially to have a mapping between flightId and id
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getFlights(); // Fetch flights from API
        setFlights(response); // Store flights in the state
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    fetchFlights();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Deleting flight with flightId:', flightId);
    
    // Find the flight by flightId
    const flightToDelete = flights.find((flight) => flight.flight_id === parseInt(flightId));

    if (!flightToDelete) {
      setMessage('Flight not found');
      return;
    }

    try {
      // Delete using the unique `id` field, mapped from the `flight_id`
      await deleteFlight(flightId);
      console.log('Flight deleted:', flightToDelete);
      setMessage('Flight deleted successfully.');
      setFlightId(''); // Reset input after deletion

      // Update the flight list by removing the deleted flight
      setFlights(flights.filter((flight) => flight.flight_id !== flightToDelete.flight_id));
    } catch (error) {
      console.error('Error deleting flight:', error);
      setMessage('Error deleting flight. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Delete Flight</h2>
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
        <button type="submit" className={styles.button}>Delete Flight</button>
      </form>

      <h3 className={styles.subtitle}>Available Flights</h3>
      {flights.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Airline ID</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Origin Airport</th>
              <th>Destination Airport</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr key={flight.flight_id}>
                <td>{flight.flight_no}</td>
                <td>{flight.airline_id}</td>
                <td>{new Date(flight.departure_time).toLocaleString()}</td>
                <td>{new Date(flight.arrival_time).toLocaleString()}</td>
                <td>{flight.origin_airport}</td>
                <td>{flight.destination_airport}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No flights available.</p>
      )}
    </div>
  );
};

export default DeleteFlight;
