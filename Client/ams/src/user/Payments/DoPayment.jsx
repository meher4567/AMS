import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createbookingsapi } from '../../api/createbookingsapi';
import styles from '../../styles/DoPayment.module.scss';

const DoPayment = ({ username, flight, passengers = [], totalAmount, selectedClass }) => {
    const [paymentID, setPaymentID] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    console.log("Flight Details in DoPayment:", flight.flight_id);

    useEffect(() => {
        const generatePaymentID = () => {
            const uniqueID = Date.now();
            setPaymentID(uniqueID);
        };
        generatePaymentID();
    }, []);

    const generateUniqueSeatNumber = (() => {
        const usedNumbers = new Set();
        
        return () => {
            let seat;
            do {
                seat = Math.floor(Math.random() * 1000) + 1;
            } while (usedNumbers.has(seat));
            
            usedNumbers.add(seat);
            return `Seat-${seat}`;
        };
    })();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentPaymentDate = new Date().toISOString();
        setPaymentDate(currentPaymentDate);

        let availableSeats = 0;

        if (selectedClass === 'Economy') {
            availableSeats = flight?.seats?.economy ?? 0;
        } else if (selectedClass === 'Business') {
            availableSeats = flight?.seats?.business ?? 0;
        } else if (selectedClass === 'First Class') {
            availableSeats = flight?.seats?.firstClass ?? 0;
        }

        if (Array.isArray(passengers) && passengers.length > 0) {
            // Generate seat numbers directly
            const newSeatNumbers = passengers.map(() => generateUniqueSeatNumber());

            const paymentData = {
                amount: totalAmount,
                payment_method: paymentMethod,
                status: "pending",
            };

            const bookingData = {
                username, // Include the username in booking data
                flight: { flight_id: flight.flight_id },
                booking: { 
                    booking_date: currentPaymentDate,
                    seatNumbers: newSeatNumbers,
                    seatClass: selectedClass,
                    booking_status: "confirmed",
                },
                passengers,
                payment: paymentData,
            };

            try {
                await createbookingsapi(bookingData);
                alert('Booking and payment completed successfully!');
                navigate('/thank-you');
            } catch (error) {
                console.error('Error in booking and payment:', error);
                alert('There was an issue completing your booking.');
            }
        } else {
            console.warn('No passengers provided');
            alert('Please select at least one passenger.');
        }
    };

    return (
        <div className={styles.paymentContainer}>
            <h2 className={styles.heading}>Payment Information</h2>
            <form onSubmit={handleSubmit} className={styles.paymentForm}>
                <div className={styles.formGroup}>
                    <label>Payment Method:</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                        className={styles.inputField}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        readOnly
                        className={styles.inputField}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Submit Payment
                </button>
            </form>
        </div>
    );
};

DoPayment.propTypes = {
    username: PropTypes.string.isRequired,
    flight: PropTypes.object.isRequired,
    passengers: PropTypes.array.isRequired,
    totalAmount: PropTypes.number.isRequired,
    selectedClass: PropTypes.string.isRequired,
};

export default DoPayment;
