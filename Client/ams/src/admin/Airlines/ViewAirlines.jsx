import { useEffect, useState } from 'react';
import { getAirlines } from '../../api/airlinesApi'; // Adjust the import based on your file structure
import styles from '../styles/Airlines/Read.module.scss'; // Import the SCSS module

const ReadAirline = () => {
  const [airlines, setAirlines] = useState([]); // State to store airlines data
  const [error, setError] = useState(null); // State to handle any errors

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await getAirlines(); // Fetch data from the API
        setAirlines(response); // Update state with the fetched airlines
      } catch (error) {
        console.error('Error fetching airlines:', error);
        setError('Failed to fetch airlines. Please try again later.'); // Set error message
      }
    };
    fetchAirlines();
  }, []);

  return (
    <div className={styles.airlinesContainer}>
      <h2 className={styles.title}>Airlines List</h2>
      {error ? (
        <p className={styles.error}>{error}</p> // Display error message if there's an error
      ) : (
        <table className={styles.airlinesTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Airline Name</th>
              <th className={styles.tableHeader}>Country</th>
              <th className={styles.tableHeader}>IATA Code</th>
            </tr>
          </thead>
          <tbody>
            {airlines.map((airline) => (
              <tr key={airline.airline_id} className={styles.tableRow}>
                <td className={styles.tableCell}>{airline.name}</td>
                <td className={styles.tableCell}>{airline.country}</td>
                <td className={styles.tableCell}>{airline.iata_code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadAirline;
