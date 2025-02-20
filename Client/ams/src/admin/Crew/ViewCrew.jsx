import { useEffect, useState } from 'react';
import { getCrewMembers } from '../../api/crewApi'; // Adjust the import based on your file structure
import styles from '../styles/Crew/Read.module.scss'; // Import SCSS file for table styling

const ReadCrew = () => {
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const response = await getCrewMembers(); // Use the API to fetch data
        setCrew(response); // Set crew data from the response
      } catch (error) {
        console.error('Error fetching crew:', error); // Handle any errors
      }
    };
    fetchCrew();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crew Members List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Crew ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Flight ID</th>
          </tr>
        </thead>
        <tbody>
          {crew.map(member => (
            <tr key={member.crew_id}>
              <td>{member.crew_id}</td>
              <td>{member.first_name}</td>
              <td>{member.last_name}</td>
              <td>{member.role}</td>
              <td>{member.flight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadCrew;
