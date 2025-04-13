import React, { useState } from 'react';
import axios from 'axios';
import './AddExpense.css'; 

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount: parseFloat(amount),
      category,
      date,
    };

    try {
      const response = await axios.post('http://localhost:8001/expenses/', expenseData);
      setMessage('Expense added successfully!');
      setAmount('');
      setCategory('');
      setDate('');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Error adding expense:', error);
      setMessage('Error adding expense. Please try again.');
    }
  };

  return (
    <div className="expense-container">
      <h2 className="expense-title">Add Expense</h2>
      {message && <div className="expense-message">{message}</div>}
      <form onSubmit={handleSubmit} className="expense-form">
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
          <label>Category</label>
          <input
            type="text"
            placeholder="e.g., Groceries, Utilities"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
        <button type="submit" className="submit-button">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
