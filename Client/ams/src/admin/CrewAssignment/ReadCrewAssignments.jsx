import { useState, useEffect } from 'react';
import { getCrewAssignments } from '../../api/crewAssignmentApi';
import styles from '../styles/CrewAssignments/Read.module.scss';

const ReadCrewAssignments = () => {
    const [crewAssignments, setCrewAssignments] = useState([]);

    useEffect(() => {
        const fetchCrewAssignments = async () => {
            try {
                const data = await getCrewAssignments();
                setCrewAssignments(data);
            } catch (error) {
                console.error('Error fetching crew assignments:', error);
            }
        };

        fetchCrewAssignments();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Crew Assignments</h2>
            {crewAssignments.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Assignment ID</th>
                            <th>Flight ID</th>
                            <th>Crew ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crewAssignments.map((assignment) => (
                            <tr key={assignment.assignment_id}>
                                <td>{assignment.assignment_id}</td>
                                <td>{assignment.flight}</td>
                                <td>{assignment.crew}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={styles.noAssignments}>No crew assignments available.</p>
            )}
        </div>
    );
};

export default ReadCrewAssignments;
