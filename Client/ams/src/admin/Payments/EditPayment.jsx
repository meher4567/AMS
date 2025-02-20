import { useState, useEffect } from 'react';
import { updatePayment, getPayments } from '../../api/paymentsApi';
import styles from '../styles/Payments/Update.module.scss'; // Adjusted SCSS path

const UpdatePayment = () => {
  const [paymentId, setPaymentId] = useState(''); // Input for payment_id
  const [formData, setFormData] = useState({
    amount: '',
    method: ''
  });
  const [payments, setPayments] = useState([]); // Store payments to map payment_id to id

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

  // Fetch the payment details based on payment_id input
  useEffect(() => {
    if (paymentId) {
      const paymentToUpdate = payments.find((p) => p.payment_id === parseInt(paymentId));

      if (paymentToUpdate) {
        setFormData(paymentToUpdate); // Populate form with payment details
      } else {
        console.error('Payment not found');
      }
    }
  }, [paymentId, payments]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating payment:', formData);

    const paymentToUpdate = payments.find((p) => p.payment_id === parseInt(paymentId));

    if (!paymentToUpdate) {
      console.error('Payment not found');
      return;
    }

    try {
      const response = await updatePayment(paymentId, formData); // Use the unique `id` for updating
      console.log('Payment updated:', response);
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>Payment ID:</label>
      <input
        type="text"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
        placeholder="Enter Payment ID"
        className={styles.input}
      />
      <label className={styles.label}>Amount:</label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>Method:</label>
      <input
        type="text"
        name="method"
        value={formData.method}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Update Payment</button>
    </form>
  );
};

export default UpdatePayment;
