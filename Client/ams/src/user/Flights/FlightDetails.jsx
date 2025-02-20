import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../../styles/FlightDetails.module.scss'; // Import the SCSS module

const FlightDetails = ({ flight, onProceed }) => {
    const [passengerCount, setPassengerCount] = useState(1);
    const [selectedClass, setSelectedClass] = useState('Economy');

    return (
        <div className={styles.flightDetailsContainer}>
            <h2 className={styles.heading}>Flight Details</h2>
            <div className={styles.detailsContainer}>
                <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                <p><strong>Airplane:</strong> {flight.airplane}</p>
                <p><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                <p><strong>Arrival Time:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {flight.status}</p>
            </div>

            <h3 className={styles.subHeading}>Available Seats</h3>
            <div className={styles.seatsContainer}>
                <p><strong>Economy:</strong> {flight.seats.economy} seats available</p>
                <p><strong>Business:</strong> {flight.seats.business} seats available</p>
                <p><strong>First Class:</strong> {flight.seats.firstClass} seats available</p>
            </div>

            <div className={styles.inputGroup}>
                <label>Number of Passengers:</label>
                <input
                    type="number"
                    value={passengerCount}
                    min="1"
                    onChange={(e) => setPassengerCount(e.target.value)}
                    className={styles.inputField}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Select Class:</label>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className={styles.selectField}
                >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First Class">First Class</option>
                </select>
            </div>

            <button
                className={styles.proceedButton}
                onClick={() => onProceed(passengerCount, selectedClass)}
            >
                Proceed to Passenger Details
            </button>
        </div>
    );
};

FlightDetails.propTypes = {
    flight: PropTypes.object.isRequired,
    onProceed: PropTypes.func.isRequired,
};

export default FlightDetails;
