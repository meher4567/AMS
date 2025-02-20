import { useEffect, useState } from 'react';
import { getAirports } from '../../api/airportsApi'; // Adjust the import based on your file structure
import styles from '../styles/Airports/Read.module.scss'; // Import the SCSS module

const ReadAirport = () => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await getAirports(); // Use the API to fetch data
        setAirports(response); // Set airports from the response
      } catch (error) {
        console.error('Error fetching airports:', error); // Handle any errors
      }
    };
    fetchAirports();
  }, []);
  
  return (
    <div className={styles.container}>
      <h2>Airports List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Airport Code</th>
            <th>Airport Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {airports.map(airport => (
            <tr key={airport.airport_code}>
              <td>{airport.airport_code}</td>
              <td>{airport.airport_name}</td>
              <td>{airport.city}</td>
              <td>{airport.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadAirport;
