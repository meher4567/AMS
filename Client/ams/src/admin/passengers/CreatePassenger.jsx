import { useState } from 'react';
import { createPassenger } from '../../api/passengersApi'; // Adjust the import based on your file structure
import styles from '../styles/Passengers/Create.module.scss'; // Import specific SCSS for Create

const CreatePassenger = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    passport_no: '',
    date_of_birth: ''
  });

  const [error, setError] = useState(''); // For form validation errors
  const [success, setSuccess] = useState(false); // To track submission success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { first_name, last_name, email, phone_number, passport_no, date_of_birth } = formData;

    // Basic form validation
    if (!first_name || !last_name || !email || !phone_number || !passport_no || !date_of_birth) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await createPassenger(formData); // API call
      console.log('Passenger created:', response);
      setSuccess(true);

      // Reset form after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        passport_no: '',
        date_of_birth: ''
      });
    } catch (error) {
      console.error('Error creating passenger:', error);
      setError('Failed to create passenger. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Passenger</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Display errors */}
      {success && <p className={styles.success}>Passenger created successfully!</p>} {/* Success message */}

      <form onSubmit={handleSubmit} className={styles.form}>
        <table>
          <tbody>
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
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className={styles.submitButton}>Create Passenger</button>
      </form>
    </div>
  );
};

export default CreatePassenger;
