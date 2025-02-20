import { useEffect, useState } from 'react';
import { getFlights } from '../../api/flightsApi'; // Adjust the import based on your file structure
import styles from '../styles/Flights/Read.module.scss'; // Import specific SCSS for Read

const ReadFlight = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await getFlights(); // Use the API to fetch data
        setFlights(response); // Set flights from the response
      } catch (error) {
        console.error('Error fetching flights:', error); // Handle any errors
      }
    };
    fetchFlights();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Flights List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Flight No</th>
            <th>Airline ID</th>
            <th>Departure</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.flight_id}>
              <td>{flight.flight_id}</td>
              <td>{flight.plane}</td>
              <td>{new Date(flight.departure_time).toLocaleString()}</td>
              <td>{new Date(flight.arrival_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadFlight;
