import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/PassengerDetails.module.scss'; // Import SCSS module

const PassengerDetails = ({ passengerCount, selectedClass, flight, onProceedToPayment }) => {
    const [passengers, setPassengers] = useState(
        Array.from({ length: passengerCount }, () => ({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            passport_number: '',
            date_of_birth: '',
        }))
    );

    const handleChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    const handleSubmit = () => {
        console.log('Passenger Details:', passengers);

        let fare;
        if (selectedClass === 'Economy') {
            fare = flight.economyFare;
        } else if (selectedClass === 'Business') {
            fare = flight.businessFare;
        } else if (selectedClass === 'First Class') {
            fare = flight.firstClassFare;
        }

        const totalAmount = fare * passengerCount;
        onProceedToPayment(totalAmount, passengers);
    };

    return (
        <div className={styles.passengerDetailsContainer}>
            <h2 className={styles.heading}>Passenger Details ({selectedClass} Class)</h2>
            {passengers.map((passenger, index) => (
                <div key={index} className={styles.passengerCard}>
                    <h4>Passenger {index + 1}</h4>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={passenger.first_name}
                        onChange={(e) => handleChange(index, 'first_name', e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={passenger.last_name}
                        onChange={(e) => handleChange(index, 'last_name', e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={passenger.email}
                        onChange={(e) => handleChange(index, 'email', e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={passenger.phone_number}
                        onChange={(e) => handleChange(index, 'phone_number', e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="text"
                        placeholder="Passport Number"
                        value={passenger.passport_number}
                        onChange={(e) => handleChange(index, 'passport_number', e.target.value)}
                        className={styles.inputField}
                    />
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={passenger.date_of_birth}
                        onChange={(e) => handleChange(index, 'date_of_birth', e.target.value)}
                        className={styles.inputField}
                    />
                </div>
            ))}
            <button onClick={handleSubmit} className={styles.proceedButton}>
                Proceed to Payment
            </button>
        </div>
    );
};

PassengerDetails.propTypes = {
    passengerCount: PropTypes.number.isRequired,
    selectedClass: PropTypes.string.isRequired,
    flight: PropTypes.object.isRequired,
    onProceedToPayment: PropTypes.func.isRequired,
};

export default PassengerDetails;
