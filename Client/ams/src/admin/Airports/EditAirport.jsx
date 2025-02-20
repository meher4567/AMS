import { useState, useEffect } from 'react';
import { updateAirport, getAirports } from '../../api/airportsApi'; // Adjust the import based on your file structure
import styles from '../styles/Airports/Update.module.scss'; // Import the SCSS module

const UpdateAirport = () => {
  const [airportCode, setAirportCode] = useState('');
  const [formData, setFormData] = useState({
    airport_code: '',
    airport_name: '',
    city: '',
    country: ''
  });
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

  // Fetch the airport details based on airport_code input
  useEffect(() => {
    if (airportCode) {
      const airportToUpdate = airports.find(a => a.airport_code === airportCode);

      if (airportToUpdate) {
        setFormData(airportToUpdate);
      } else {
        console.error('Airport not found');
      }
    }
  }, [airportCode, airports]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating airport:', formData);

    const airportToUpdate = airports.find(a => a.airport_code === airportCode);

    if (!airportToUpdate) {
      console.error('Airport not found');
      return;
    }

    try {
      const response = await updateAirport(airportCode, formData);
      console.log('Airport updated:', response);
    } catch (error) {
      console.error('Error updating airport:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label>Airport Code:</label>
      <input
        type="text"
        value={airportCode}
        onChange={(e) => setAirportCode(e.target.value)}
        placeholder="Enter Airport Code"
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
      <button type="submit">Update Airport</button>
    </form>
  );
};

export default UpdateAirport;
