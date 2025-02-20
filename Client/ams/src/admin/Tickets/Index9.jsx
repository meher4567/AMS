import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index9.module.scss';

// Import all CRUD components for Tickets
import CreateTicket from './CreateTicket';
import ReadTicket from './ViewTickets';
import UpdateTicket from './UpdateTicket';
import DeleteTicket from './DeleteTicket';
import SearchTickets from './SearchTickets';

const Index9 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the relative path
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-ticket')}>Create Ticket</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-ticket')}>Read Tickets</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-ticket')}>Update Ticket</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-ticket')}>Delete Ticket</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-ticket')}>Search Tickets</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-ticket" element={<CreateTicket />} />
        <Route path="read-ticket" element={<ReadTicket />} />
        <Route path="update-ticket" element={<UpdateTicket />} />
        <Route path="delete-ticket" element={<DeleteTicket />} />
        <Route path="search-ticket" element={<SearchTickets />} />
      </Routes>
    </div>
  );
};

export default Index9;
