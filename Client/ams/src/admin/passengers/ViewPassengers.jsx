import { useEffect, useState } from 'react';
import { getPassengers } from '../../api/passengersApi'; // Adjust the import based on your file structure
import styles from '../styles/Passengers/Read.module.scss'; // Import specific SCSS for Read

const ReadPassenger = () => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await getPassengers(); // Use the API to fetch data
        setPassengers(response); // Set passengers from the response
      } catch (error) {
        console.error('Error fetching passengers:', error); // Handle any errors
      }
    };
    fetchPassengers();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Passengers List</h2>
      <table className={styles.passengerTable}>
        <thead>
          <tr>
            <th>Passenger ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Passport No</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map(passenger => (
            <tr key={passenger.passenger_id}>
              <td>{passenger.passenger_id}</td>
              <td>{passenger.first_name}</td>
              <td>{passenger.last_name}</td>
              <td>{passenger.email}</td>
              <td>{passenger.phone_number}</td>
              <td>{passenger.passport_no}</td>
              <td>{passenger.date_of_birth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadPassenger;
