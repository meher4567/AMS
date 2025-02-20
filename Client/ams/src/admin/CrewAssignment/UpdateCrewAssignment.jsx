import { useState, useEffect } from 'react';
import { updateCrewAssignment, getCrewAssignments } from '../../api/crewAssignmentApi'; // Adjust the import if needed
import styles from '../styles/CrewAssignments/Update.module.scss';

const UpdateCrewAssignment = () => {
  const [assignmentId, setAssignmentId] = useState('');
  const [formData, setFormData] = useState({
    flight: '',
    crew: ''
  });
  const [assignments, setAssignments] = useState([]); // Store crew assignments to map assignment_id to id

  useEffect(() => {
    const fetchCrewAssignments = async () => {
      try {
        const response = await getCrewAssignments();
        setAssignments(response);
      } catch (error) {
        console.error('Error fetching crew assignments:', error);
      }
    };
    fetchCrewAssignments();
  }, []);

  useEffect(() => {
    if (assignmentId) {
      const assignmentToUpdate = assignments.find(a => a.assignment_id === parseInt(assignmentId));
      if (assignmentToUpdate) {
        setFormData(assignmentToUpdate); // Populate form with assignment details
      } else {
        console.error('Crew assignment not found');
      }
    }
  }, [assignmentId, assignments]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating crew assignment:', formData);

    const assignmentToUpdate = assignments.find(a => a.assignment_id === parseInt(assignmentId));

    if (!assignmentToUpdate) {
      console.error('Crew assignment not found');
      return;
    }

    try {
      const response = await updateCrewAssignment(assignmentId, formData); // Use the unique `id` for updating
      console.log('Crew assignment updated:', response);
      alert('Crew assignment updated successfully!');
    } catch (error) {
      console.error('Error updating crew assignment:', error);
      alert('Failed to update crew assignment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Assignment ID:</label>
      <input
        type="text"
        value={assignmentId}
        onChange={(e) => setAssignmentId(e.target.value)}
        placeholder="Enter Assignment ID"
        className={styles.input}
      />
      <label className={styles.label}>Flight:</label>
      <input
        type="text"
        name="flight"
        value={formData.flight}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>Crew:</label>
      <input
        type="text"
        name="crew"
        value={formData.crew}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Update Assignment</button>
    </form>
  );
};

export default UpdateCrewAssignment;
