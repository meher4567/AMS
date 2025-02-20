import { useState, useEffect } from 'react';
import { updateCrewMember, getCrewMembers } from '../../api/crewApi'; // Adjust the import based on your file structure
import styles from '../styles/Crew/Update.module.scss'; // Import specific SCSS for UpdateCrew

const UpdateCrew = () => {
  const [crewId, setCrewId] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: '',
    flight_id: ''
  });
  const [crewMembers, setCrewMembers] = useState([]); // Store crew members to map crew_id to id

  useEffect(() => {
    const fetchCrewMembers = async () => {
      try {
        const response = await getCrewMembers();
        setCrewMembers(response);
      } catch (error) {
        console.error('Error fetching crew members:', error);
      }
    };
    fetchCrewMembers();
  }, []);

  useEffect(() => {
    if (crewId) {
      const crewToUpdate = crewMembers.find(c => c.crew_id === parseInt(crewId));
      if (crewToUpdate) {
        setFormData(crewToUpdate); // Populate form with crew member details
      } else {
        console.error('Crew member not found');
      }
    }
  }, [crewId, crewMembers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating crew member:', formData);

    const crewToUpdate = crewMembers.find(c => c.crew_id === parseInt(crewId));

    if (!crewToUpdate) {
      console.error('Crew member not found');
      return;
    }

    try {
      const response = await updateCrewMember(crewId, formData); // Use the unique `id` for updating
      console.log('Crew member updated:', response);
    } catch (error) {
      console.error('Error updating crew member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Crew ID:</label>
      <input
        type="text"
        value={crewId}
        onChange={(e) => setCrewId(e.target.value)}
        placeholder="Enter Crew ID"
        className={styles.input}
      />
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
      <button type="submit" className={styles.button}>Update Crew Member</button>
    </form>
  );
};

export default UpdateCrew;
