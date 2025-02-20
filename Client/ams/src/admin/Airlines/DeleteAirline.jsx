import { useState } from 'react';
import { deleteAirline } from '../../api/airlinesApi'; // Assuming you have deleteAirline in your API file
import styles from '../styles/Airlines/Delete.module.scss';

const DeleteAirline = () => {
  const [airlineId, setAirlineId] = useState('');

  const handleDelete = async () => {
    if (!airlineId) {
      console.error('Please provide an airline ID');
      return;
    }

    console.log('Deleting airline with airline_id:', airlineId);

    try {
      await deleteAirline(airlineId);  // Directly call the API
      console.log('Airline deleted successfully');
      setAirlineId('');  // Reset input field after successful deletion
    } catch (error) {
      console.error('Error deleting airline:', error);
    }
  };

  return (
    <div className={styles.container}>
      <label>Airline ID:</label>
      <input 
        type="text" 
        value={airlineId} 
        onChange={(e) => setAirlineId(e.target.value)} 
        placeholder="Enter Airline ID" 
      />
      <button onClick={handleDelete}>Delete Airline</button>
    </div>
  );
};

export default DeleteAirline;
