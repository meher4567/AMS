import { useEffect, useState } from 'react';
import { getPayments } from '../../api/paymentsApi'; // Adjust the import based on your file structure
import styles from '../styles/Payments/Read.module.scss';

const ViewPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPayments();
        setPayments(response);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Payments List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.amount}</td>
              <td>{payment.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPayments;
