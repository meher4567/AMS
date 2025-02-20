import { useState, useEffect } from 'react';
import { updateAirline, getAirlines } from '../../api/airlinesApi'; // Adjust the import based on your file structure
import styles from '../styles/Airlines/Update.module.scss'; // Import the SCSS module

const UpdateAirline = () => {
  const [airlineId, setAirlineId] = useState(''); // Input for airline_id
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    iata_code: '',
  });
  const [airlines, setAirlines] = useState([]); // Store airlines to map airline_id to id

  // Fetch all airlines initially
  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await getAirlines();
        setAirlines(response);
      } catch (error) {
        console.error('Error fetching airlines:', error);
      }
    };
    fetchAirlines();
  }, []);

  // Fetch and populate the form based on the airlineId input
  useEffect(() => {
    if (airlineId) {
      const airlineToUpdate = airlines.find(a => a.airline_id === parseInt(airlineId));
      if (airlineToUpdate) {
        setFormData({
          name: airlineToUpdate.name,
          country: airlineToUpdate.country,
          iata_code: airlineToUpdate.iata_code,
        });
      } else {
        console.error('Airline not found');
      }
    }
  }, [airlineId, airlines]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.country || !formData.iata_code) {
      console.error('Please fill out all fields');
      return;
    }

    try {
      const response = await updateAirline(airlineId, formData); // Send update request
      console.log('Airline updated:', response);
      // Optionally reset the form or notify user of success
    } catch (error) {
      console.error('Error updating airline:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label>Airline ID:</label>
      <input 
        type="text" 
        value={airlineId} 
        onChange={(e) => setAirlineId(e.target.value)} 
        placeholder="Enter Airline ID" 
        required
      />
      <label>Airline Name:</label>
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Enter Airline Name"
        required
      />
      <label>Country:</label>
      <input 
        type="text" 
        name="country" 
        value={formData.country} 
        onChange={handleChange} 
        placeholder="Enter Country"
        required
      />
      <label>IATA Code:</label>
      <input 
        type="text" 
        name="iata_code" 
        value={formData.iata_code} 
        onChange={handleChange} 
        placeholder="Enter IATA Code"
        required
        maxLength="2"
      />
      <button type="submit">Update Airline</button>
    </form>
  );
};

export default UpdateAirline;
