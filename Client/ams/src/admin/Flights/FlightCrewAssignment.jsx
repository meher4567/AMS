import { useState } from 'react';
import { searchFlights } from '../../api/flightsApi';
import styles from '../styles/Flights/FlightCrewAssignment.module.scss';
import { assignCrewToFlight } from '../../api/flightsApi'; // Adjust the import based on your API utility

const FlightCrewAssignment = () => {
    const [flightId, setFlightId] = useState('');
    const [flightDetails, setFlightDetails] = useState(null); // State to hold flight details
    const [crewIds, setCrewIds] = useState({
        pilot: '',
        coPilot: '',
        leadFlightAttendant: '',
        flightAttendant1: '',
        flightAttendant2: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFlightSearch = async () => {
        setLoading(true);
        setError(null);

        if (!flightId) {
            setError('Please enter a flight ID.');
            setLoading(false);
            return;
        }

        try {
            const response = await searchFlights('flight_id', flightId);
            console.log('API Response:', response); // Log the response for debugging

            // Filter the flight details based on the flight ID
            const foundFlight = response.find(flight => flight.flight_id === parseInt(flightId)); // Adjusting for ID comparison
            if (foundFlight) {
                setFlightDetails(foundFlight); // Store flight details in state
            } else {
                setError('Flight not found.');
                setFlightDetails(null); // Clear flight details if not found
            }
        } catch (err) {
            console.error('Error:', err); // Log any errors
            setError('Error searching for flight.');
        } finally {
            setLoading(false);
        }
    };

    const handleCrewAssignment = async () => {
        // Prepare the data to send
        const crewAssignments = [
            { crew_id: crewIds.pilot, role: 'Pilot' },
            { crew_id: crewIds.coPilot, role: 'Co-Pilot' },
            { crew_id: crewIds.leadFlightAttendant, role: 'Lead Flight Attendant' },
            { crew_id: crewIds.flightAttendant1, role: 'Flight Attendant 1' },
            { crew_id: crewIds.flightAttendant2, role: 'Flight Attendant 2' },
        ];
    
        try {
            // Make the API call to assign crew to the flight
            const response = await assignCrewToFlight({
                flight_id: flightId,
                crew_assignments: crewAssignments,
            });
    
            // Handle the response accordingly
            console.log('Crew assigned successfully:', response.data);
        } catch (error) {
            console.error('Error assigning crew:', error.response?.data || error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Flight Crew Assignment</h2>

            {/* Flight ID Search */}
            <input
                type="text"
                placeholder="Enter Flight ID"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                className={styles.searchInput}
            />
            <button onClick={handleFlightSearch} className={styles.searchButton}>
                Search Flight
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {flightDetails && (
                <div className={styles.flightDetails}>
                    <h3>Flight Details for ID: {flightDetails.flight_id}</h3>
                    <p><strong>Flight Number:</strong> {flightDetails.flight_number}</p>
                    <p><strong>Departure Time:</strong> {new Date(flightDetails.departure_time).toLocaleString()}</p>
                    <p><strong>Arrival Time:</strong> {new Date(flightDetails.arrival_time).toLocaleString()}</p>
                    <p><strong>Origin:</strong> {flightDetails.origin}</p>
                    <p><strong>Destination:</strong> {flightDetails.destination}</p>
                    <p><strong>Plane:</strong> {flightDetails.plane}</p>
                    <p><strong>Status:</strong> {flightDetails.status}</p>

                    {/* Crew role inputs */}
                    <h4>Assign Crew:</h4>
                    <label>Pilot ID:</label>
                    <input
                        type="text"
                        value={crewIds.pilot}
                        onChange={(e) => setCrewIds({ ...crewIds, pilot: e.target.value })}
                        className={styles.crewInput}
                    />

                    <label>Co-Pilot ID:</label>
                    <input
                        type="text"
                        value={crewIds.coPilot}
                        onChange={(e) => setCrewIds({ ...crewIds, coPilot: e.target.value })}
                        className={styles.crewInput}
                    />

                    <label>Lead Flight Attendant ID:</label>
                    <input
                        type="text"
                        value={crewIds.leadFlightAttendant}
                        onChange={(e) => setCrewIds({ ...crewIds, leadFlightAttendant: e.target.value })}
                        className={styles.crewInput}
                    />

                    <label>Flight Attendant 1 ID:</label>
                    <input
                        type="text"
                        value={crewIds.flightAttendant1}
                        onChange={(e) => setCrewIds({ ...crewIds, flightAttendant1: e.target.value })}
                        className={styles.crewInput}
                    />

                    <label>Flight Attendant 2 ID:</label>
                    <input
                        type="text"
                        value={crewIds.flightAttendant2}
                        onChange={(e) => setCrewIds({ ...crewIds, flightAttendant2: e.target.value })}
                        className={styles.crewInput}
                    />

                    <button onClick={handleCrewAssignment} className={styles.assignButton}>
                        Assign Crew
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlightCrewAssignment;
