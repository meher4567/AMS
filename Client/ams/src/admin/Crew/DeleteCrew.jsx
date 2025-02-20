import { useState, useEffect } from 'react';
import { getCrewMembers, deleteCrewMember } from '../../api/crewApi'; // Adjust the import based on your file structure
import styles from '../styles/Crew/Delete.module.scss'; // Import specific SCSS for Delete

const DeleteCrew = () => {
  const [crewId, setCrewId] = useState('');
  const [crewMembers, setCrewMembers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all crew members initially
  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const response = await getCrewMembers();
        setCrewMembers(response);
      } catch (error) {
        console.error('Error fetching crew members:', error);
      }
    };
    fetchCrew();
  }, []);

  const handleDelete = async () => {
    setError(''); // Reset errors
    setSuccess(''); // Reset success messages

    const crewToDelete = crewMembers.find((crew) => crew.crew_id === parseInt(crewId));

    if (!crewToDelete) {
      setError('Crew member not found');
      return;
    }

    try {
      await deleteCrewMember(crewId); // Call API to delete crew member
      console.log('Crew member deleted:', crewToDelete);
      setSuccess('Crew member deleted successfully!'); // Success message
      setCrewId(''); // Reset input after deletion
      
      // Update the local state by removing the deleted crew member
      setCrewMembers(crewMembers.filter((crew) => crew.crew_id !== crewToDelete.crew_id));
    } catch (error) {
      console.error('Error deleting crew member:', error);
      setError('Failed to delete crew member. Please try again.'); // Handle errors
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Delete Crew Member</h2>
      <label>Crew ID:</label>
      <input 
        type="text" 
        value={crewId} 
        onChange={(e) => setCrewId(e.target.value)} 
        placeholder="Enter Crew ID" 
        className={styles.input}
      />
      <button onClick={handleDelete} className={styles.button}>Delete Crew Member</button>
      {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
      {success && <p className={styles.success}>{success}</p>} {/* Display success message */}
    </div>
  );
};

export default DeleteCrew;
