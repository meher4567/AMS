import { useState } from 'react';
import { createCrewAssignment } from '../../api/crewAssignmentApi';
import styles from '../styles/CrewAssignments/Create.module.scss';

const CreateCrewAssignment = () => {
    const [formData, setFormData] = useState({ flight: '', crew: '' }); // Changed keys here
    const [error, setError] = useState(''); // For form validation errors
    const [success, setSuccess] = useState(false); // To track submission success

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const { flight, crew } = formData; // Changed keys here

        if (!flight || !crew) {
            setError('Both Flight and Crew are required.');
            return;
        }

        try {
            await createCrewAssignment(formData); // API call with updated keys
            setSuccess(true);
            setFormData({ flight: '', crew: '' }); // Reset form after successful submission
        } catch (error) {
            console.error('Error creating crew assignment:', error);
            setError('Failed to create crew assignment. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Create Crew Assignment</h2>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>Crew assignment created successfully!</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.formLabel}>
                    Flight:
                    <input
                        type="number"
                        name="flight" // Changed name here
                        value={formData.flight}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <label className={styles.formLabel}>
                    Crew:
                    <input
                        type="number"
                        name="crew" // Changed name here
                        value={formData.crew}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </label>
                <button type="submit" className={styles.submitButton}>Create Assignment</button>
            </form>
        </div>
    );
};

export default CreateCrewAssignment;
