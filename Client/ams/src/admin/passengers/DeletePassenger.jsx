import { useState, useEffect } from 'react';
import { getPassengers, deletePassenger } from '../../api/passengersApi'; // Adjust the import based on your file structure
import styles from '../styles/passengers/Delete.module.scss'; // Import the styles

const DeletePassenger = () => {
  const [passengerId, setPassengerId] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all passengers initially
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await getPassengers();
        setPassengers(response);
      } catch (error) {
        console.error('Error fetching passengers:', error);
      }
    };
    fetchPassengers();
  }, []);

  const handleDelete = async () => {
    if (!passengerId) {
      setError('Passenger ID is required');
      return;
    }

    try {
      await deletePassenger(passengerId);
      setSuccess('Passenger deleted successfully!');
      setError('');
      setPassengerId('');
      setPassengers(passengers.filter((passenger) => passenger.passenger_id !== parseInt(passengerId)));
    } catch (error) {
      console.error('Error deleting passenger:', error);
      setError('Failed to delete passenger. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <label>Passenger ID:</label>
      <input
        type="text"
        value={passengerId}
        onChange={(e) => setPassengerId(e.target.value)}
        placeholder="Enter Passenger ID"
      />
      <button onClick={handleDelete}>Delete Passenger</button>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default DeletePassenger;
