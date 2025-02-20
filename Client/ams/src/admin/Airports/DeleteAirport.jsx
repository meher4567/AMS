import { useState, useEffect } from 'react';
import { getAirports, deleteAirport } from '../../api/airportsApi'; // Adjust the import based on your file structure
import styles from '../styles/Airports/Delete.module.scss'; // Import the SCSS module

const DeleteAirport = () => {
  const [airportCode, setAirportCode] = useState('');
  const [airports, setAirports] = useState([]);

  // Fetch all airports initially
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await getAirports();
        setAirports(response);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };
    fetchAirports();
  }, []);

  const handleDelete = async () => {
    console.log('Deleting airport with code:', airportCode);
    
    const airportToDelete = airports.find((airport) => airport.airport_code === airportCode);

    if (!airportToDelete) {
      console.error('Airport not found');
      return;
    }

    try {
      await deleteAirport(airportCode);
      console.log('Airport deleted:', airportToDelete);
      setAirportCode('');

      setAirports(airports.filter((airport) => airport.id !== airportToDelete.id));
    } catch (error) {
      console.error('Error deleting airport:', error);
    }
  };

  return (
    <div className={styles.container}>
      <label>Airport Code:</label>
      <input 
        type="text" 
        value={airportCode} 
        onChange={(e) => setAirportCode(e.target.value)} 
        placeholder="Enter Airport Code" 
      />
      <button onClick={handleDelete}>Delete Airport</button>
    </div>
  );
};

export default DeleteAirport;
