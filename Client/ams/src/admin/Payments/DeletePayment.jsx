import { useState, useEffect } from 'react';
import { getPayments, deletePayment } from '../../api/paymentsApi';
import styles from '../styles/Payments/Delete.module.scss';

const DeletePayment = () => {
  const [paymentId, setPaymentId] = useState('');
  const [payments, setPayments] = useState([]);

  // Fetch all payments initially
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

  const handleDelete = async () => {
    console.log('Deleting payment with paymentId:', paymentId);

    const paymentToDelete = payments.find((payment) => payment.payment_id === parseInt(paymentId));

    if (!paymentToDelete) {
      console.error('Payment not found');
      return;
    }

    try {
      await deletePayment(paymentId);
      console.log('Payment deleted:', paymentToDelete);
      setPaymentId('');
      setPayments(payments.filter((payment) => payment.payment_id !== parseInt(paymentId)));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Payment ID:</label>
      <input
        type="text"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
        placeholder="Enter Payment ID"
        className={styles.input}
      />
      <button onClick={handleDelete} className={styles.button}>
        Delete Payment
      </button>
    </div>
  );
};

export default DeletePayment;
