import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/SearchFlights.module.scss';
import FlightDetails from './FlightDetails';
import PassengerDetails from '../Passengers/PassengerDetails';
import DoPayment from '../Payments/DoPayment';
import { getFlights } from '../../api/getAllFlightsapi';
import { getAirports } from '../../api/airportsApi';
import { useUser } from '../../components/UserContext';

const SearchFlights = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [results, setResults] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [passengerDetailsVisible, setPassengerDetailsVisible] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [passengerCount, setPassengerCount] = useState(1);
    const [selectedClass, setSelectedClass] = useState('Economy');
    const [passengers, setPassengers] = useState([]);
    const { username } = useUser();
    const wrapperRef = useRef(null);
    const [airportSuggestions, setAirportSuggestions] = useState([]);
    const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const airports = await getAirports();
                setAirportSuggestions(airports);
            } catch (error) {
                console.error('Error fetching airports:', error);
            }
        };
        fetchAirports();
    }, []);

    useEffect(() => {
        const fetchAllFlights = async () => {
            try {
                const allFlights = await getFlights();
                setResults(allFlights);
            } catch (error) {
                console.error('Error fetching all flights:', error);
            }
        };
        fetchAllFlights();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const searchResults = await getFlights(source, destination, startDate, endDate);
            setResults(searchResults);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleBookTicket = (flight) => {
        setSelectedFlight(flight);
    };

    const proceedToPassengerDetails = (passengerCount, selectedClass) => {
        setPassengerCount(passengerCount);
        setSelectedClass(selectedClass);
        setPassengerDetailsVisible(true);
    };

    const proceedToPayment = (totalAmount, passengers) => {
        setTotalAmount(totalAmount);
        setPassengers(passengers);
        setPaymentVisible(true);
    };

    const filterAirports = (query) => {
        return airportSuggestions.filter(
            (airport) =>
                airport?.airport_name?.toLowerCase().includes(query.toLowerCase()) ||
                airport?.airport_code?.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleSourceChange = (e) => {
        setSource(e.target.value);
        setShowSourceSuggestions(true);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        setShowDestinationSuggestions(true);
    };

    const selectSourceSuggestion = (airport) => {
        setSource(airport.airport_code);
        setShowSourceSuggestions(false);
    };

    const selectDestinationSuggestion = (airport) => {
        setDestination(airport.airport_code);
        setShowDestinationSuggestions(false);
    };

    const renderSourceSuggestions = () => {
        const filteredAirports = filterAirports(source);
        return (
            <table className={styles.suggestionsTable}>
                <tbody>
                    {filteredAirports.map((airport, index) => (
                        <tr key={index} onClick={() => selectSourceSuggestion(airport)}>
                            <td>{airport.airport_name}</td>
                            <td>({airport.airport_code})</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderDestinationSuggestions = () => {
        const filteredAirports = filterAirports(destination);
        return (
            <table className={styles.suggestionsTable}>
                <tbody>
                    {filteredAirports.map((airport, index) => (
                        <tr key={index} onClick={() => selectDestinationSuggestion(airport)}>
                            <td>{airport.airport_name}</td>
                            <td>({airport.airport_code})</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSourceSuggestions(false);
                setShowDestinationSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef} className={styles.searchFlightsContainer}>
            {!selectedFlight ? (
                <div className={styles.formContainer}>
                    <h1 className={styles.heading}>Search Flights</h1>
                    <form onSubmit={handleSearch} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Source Airport:</label>
                            <input
                                type="text"
                                value={source}
                                onChange={handleSourceChange}
                                onFocus={() => setShowSourceSuggestions(true)}
                                placeholder="Enter source airport"
                                className={styles.inputField}
                            />
                            {showSourceSuggestions && renderSourceSuggestions()}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Destination Airport:</label>
                            <input
                                type="text"
                                value={destination}
                                onChange={handleDestinationChange}
                                onFocus={() => setShowDestinationSuggestions(true)}
                                placeholder="Enter destination airport"
                                className={styles.inputField}
                            />
                            {showDestinationSuggestions && renderDestinationSuggestions()}
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>
                        <button type="submit" className={styles.searchButton}>Search</button>
                    </form>

                    <div className={styles.resultsContainer}>
                        <h2 className={styles.resultsHeading}>Flight Results</h2>
                        {results.length > 0 ? (
                            <table className={styles.resultsTable}>
                                <thead>
                                    <tr>
                                        <th>Flight Number</th>
                                        <th>Airplane</th>
                                        <th>Departure Time</th>
                                        <th>Arrival Time</th>
                                        <th>Economy Fare</th>
                                        <th>Business Fare</th>
                                        <th>First Class Fare</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((flight, index) => (
                                        <tr key={index} className={styles.tableRow}>
                                            <td>{flight.flightNumber}</td>
                                            <td>{flight.airplane}</td>
                                            <td>{new Date(flight.departureTime).toLocaleString()}</td>
                                            <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                                            <td>{flight.economyFare}</td>
                                            <td>{flight.businessFare}</td>
                                            <td>{flight.firstClassFare}</td>
                                            <td>{flight.status}</td>
                                            <td>
                                                <button
                                                    className={styles.bookButton}
                                                    onClick={() => handleBookTicket(flight)}
                                                >
                                                    Book Ticket
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noResults}>No flights found.</p>
                        )}
                    </div>
                </div>
            ) : paymentVisible ? (
                <DoPayment
                    totalAmount={totalAmount}
                    passengers={passengers}
                    flight={selectedFlight}
                    selectedClass={selectedClass}
                    username={username}
                />
            ) : passengerDetailsVisible ? (
                <PassengerDetails
                    passengerCount={passengerCount}
                    selectedClass={selectedClass}
                    flight={selectedFlight}
                    onProceedToPayment={proceedToPayment}
                />
            ) : (
                <FlightDetails
                    flight={selectedFlight}
                    onProceed={proceedToPassengerDetails}
                />
            )}
        </div>
    );
};

export default SearchFlights;
