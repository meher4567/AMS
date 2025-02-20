import { useState } from 'react';
import { createPayment } from '../../api/paymentsApi'; // Adjust the import based on your file structure
import styles from '../styles/Payments/Create.module.scss';

const CreatePayment = () => {
  const [formData, setFormData] = useState({
    amount: '',
    method: '',
    payment_date: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const { amount, method, payment_date } = formData;

    if (!amount || !method || !payment_date) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await createPayment(formData);
      console.log('Payment created:', response);
      setSuccess(true);
      setFormData({
        amount: '',
        method: '',
        payment_date: ''
      });
    } catch (error) {
      console.error('Error creating payment:', error);
      setError('Failed to create payment. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Payment</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Payment created successfully!</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
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

        <label className={styles.label}>Payment Date:</label>
        <input
          type="datetime-local"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Create Payment</button>
      </form>
    </div>
  );
};

export default CreatePayment;
