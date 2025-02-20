import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index5.module.scss';

// Import all CRUD components for Bookings
import CreateBooking from './CreateBooking';
import ReadBooking from './ViewBookings';
import UpdateBooking from './UpdateBooking';
import DeleteBooking from './DeleteBooking';
import SearchBookings from './SearchBookings';

const Index5 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-booking')}>Create Booking</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-booking')}>Read Bookings</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-booking')}>Update Booking</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-booking')}>Delete Booking</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-booking')}>Search Booking</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-booking" element={<CreateBooking />} />
        <Route path="read-booking" element={<ReadBooking />} />
        <Route path="update-booking" element={<UpdateBooking />} />
        <Route path="delete-booking" element={<DeleteBooking />} />
        <Route path="search-booking" element={<SearchBookings />} />
      </Routes>
    </div>
  );
};

export default Index5;
