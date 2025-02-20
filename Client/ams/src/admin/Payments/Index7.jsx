import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from '../styles/Index/Index7.module.scss';

// Import all CRUD components for Payments
import CreatePayment from './CreatePayment';
import ReadPayment from './ViewPayments';
import UpdatePayment from './EditPayment';
import DeletePayment from './DeletePayment';
import SearchPayment from './SearchPayment';

const Index7 = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('create-payment')}>Create Payment</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('read-payment')}>Read Payments</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('update-payment')}>Update Payment</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('delete-payment')}>Delete Payment</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('search-payment')}>Search Payments</button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="create-payment" element={<CreatePayment />} />
        <Route path="read-payment" element={<ReadPayment />} />
        <Route path="update-payment" element={<UpdatePayment />} />
        <Route path="delete-payment" element={<DeletePayment />} />
        <Route path="search-payment" element={<SearchPayment />} />
      </Routes>
    </div>
  );
};

export default Index7;
