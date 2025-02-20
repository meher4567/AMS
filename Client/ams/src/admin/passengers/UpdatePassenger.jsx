import { useState, useEffect } from 'react';
import { updatePassenger, getPassengers } from '../../api/passengersApi'; // Adjust the import based on your file structure
import styles from '../styles/Passengers/Update.module.scss'; // Import specific SCSS for Update

const UpdatePassenger = () => {
  const [passengerId, setPassengerId] = useState(''); // Input for passenger_id
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    passport_no: '',
    date_of_birth: '' // Changed to match the API response
  });
  const [passengers, setPassengers] = useState([]); // Store passengers to map passenger_id to id
  const [error, setError] = useState(''); // For form validation errors
  const [success, setSuccess] = useState(false); // To track submission success

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

  // Fetch the passenger details based on passenger_id input
  useEffect(() => {
    if (passengerId) {
      const passengerToUpdate = passengers.find(p => p.passenger_id === parseInt(passengerId));

      if (passengerToUpdate) {
        setFormData(passengerToUpdate); // Populate form with passenger details
      } else {
        console.error('Passenger not found');
        setError('Passenger not found'); // Set error if not found
      }
    } else {
      setFormData({ // Reset form if passengerId is empty
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        passport_no: '',
        date_of_birth: ''
      });
      setError(''); // Reset error message
    }
  }, [passengerId, passengers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const passengerToUpdate = passengers.find(p => p.passenger_id === parseInt(passengerId));

    if (!passengerToUpdate) {
      setError('Passenger not found'); // Handle case when passenger is not found
      return;
    }

    try {
      const response = await updatePassenger(passengerId, formData); // Use the unique `id` for updating
      console.log('Passenger updated:', response);
      setSuccess(true); // Set success if updated successfully
      // Optionally reset the form or perform other actions after updating
    } catch (error) {
      console.error('Error updating passenger:', error);
      setError('Failed to update passenger. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Passenger</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Display errors */}
      {success && <p className={styles.success}>Passenger updated successfully!</p>} {/* Success message */}

      <form onSubmit={handleSubmit} className={styles.form}>
        <table>
          <tbody>
            <tr>
              <td><label>Passenger ID:</label></td>
              <td>
                <input
                  type="text"
                  value={passengerId}
                  onChange={(e) => setPassengerId(e.target.value)}
                  placeholder="Enter Passenger ID"
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>First Name:</label></td>
              <td>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Last Name:</label></td>
              <td>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Email:</label></td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Phone Number:</label></td>
              <td>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Passport No:</label></td>
              <td>
                <input
                  type="text"
                  name="passport_no"
                  value={formData.passport_no}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Date of Birth:</label></td>
              <td>
                <input
                  type="date"
                  name="date_of_birth" // Match with the API
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className={styles.submitButton}>Update Passenger</button>
      </form>
    </div>
  );
};

export default UpdatePassenger;
