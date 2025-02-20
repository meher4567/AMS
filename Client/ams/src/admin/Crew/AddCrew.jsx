import { useState } from 'react';
import { createCrewMember } from '../../api/crewApi'; // Adjust the import based on your file structure
import styles from '../styles/Crew/Create.module.scss'; // Import specific SCSS for CreateCrew

const CreateCrew = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: '',
    flight_id: ''
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

    const { first_name, last_name, role, flight_id } = formData;

    if (!first_name || !last_name || !role || !flight_id) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await createCrewMember(formData); // API call
      console.log('Crew member created:', response);
      setSuccess(true);

      // Reset form after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        role: '',
        flight_id: ''
      });
    } catch (error) {
      console.error('Error creating crew member:', error);
      setError('Failed to create crew member. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Crew Member</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Crew member created successfully!</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Flight ID:</label>
        <input
          type="text"
          name="flight_id"
          value={formData.flight_id}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Create Crew Member</button>
      </form>
    </div>
  );
};

export default CreateCrew;
