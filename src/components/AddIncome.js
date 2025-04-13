import React, { useState } from 'react';
import axios from 'axios';
import './AddIncome.css'; 

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const incomeData = {
      amount: parseFloat(amount),
      source,
      date,
    };

    try {
      const response = await axios.post('http://localhost:8001/income/', incomeData);
      console.log('Income added:', response.data);
      setMessage('Income added successfully!');
      setAmount('');
      setSource('');
      setDate('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding income:', error);
      setMessage('Error adding income. Please try again.');
    }
  };

  return (
    <div className="income-container">
      <h2 className="income-title">Add Income</h2>
      {message && <div className="income-message">{message}</div>}
      <form onSubmit={handleSubmit} className="income-form">
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Source</label>
          <input
            type="text"
            placeholder="e.g., Salary, Freelance"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Income</button>
      </form>
    </div>
  );
};

export default AddIncome;
