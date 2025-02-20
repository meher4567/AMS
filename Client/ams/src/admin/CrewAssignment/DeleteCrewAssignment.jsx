import { useState } from 'react';
import { deleteCrewAssignment } from '../../api/crewAssignmentApi';
import styles from '../styles/CrewAssignments/Delete.module.scss';

const DeleteCrewAssignment = () => {
    const [assignmentId, setAssignmentId] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteCrewAssignment(assignmentId);
            alert('Crew assignment deleted successfully!');
            setAssignmentId('');
        } catch (error) {
            console.error('Error deleting crew assignment:', error);
            alert('Failed to delete crew assignment');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Delete Crew Assignment</h2>
            <form onSubmit={handleDelete} className={styles.form}>
                <label className={styles.label}>
                    Assignment ID:
                    <input
                        type="number"
                        value={assignmentId}
                        onChange={(e) => setAssignmentId(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.button}>Delete Assignment</button>
            </form>
        </div>
    );
};

export default DeleteCrewAssignment;
