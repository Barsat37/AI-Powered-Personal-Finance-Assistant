import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetLimits.css';

const BudgetLimits = () => {
  const [category, setCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [budgetLimits, setBudgetLimits] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBudgetLimits();
  }, []);

  const fetchBudgetLimits = async () => {
    try {
      const response = await axios.get('http://localhost:8001/budget-limits/');
      setBudgetLimits(response.data);
    } catch (error) {
      console.error('Error fetching budget limits:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetData = {
      category: category,
      limit_amount: parseFloat(limitAmount),
      period: period,
    };

    try {
      const response = await axios.post('http://localhost:8001/budget-limits/', budgetData);
      setMessage('Budget limit set successfully!');
      setCategory('');
      setLimitAmount('');
      fetchBudgetLimits();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error setting budget limit:', error);
      setMessage('Error setting budget limit. Please try again.');
    }
  };

  return (
    <div className="budget-container">
      <h2 className="budget-title">Budget Limits</h2>
      {message && <div className="budget-message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="budget-form">
        <div>
          <label className="budget-label">Category</label>
          <input
            type="text"
            placeholder="e.g., Groceries, Entertainment"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="budget-input"
            required
          />
        </div>
        <div>
          <label className="budget-label">Limit Amount</label>
          <input
            type="number"
            placeholder="Enter maximum amount"
            value={limitAmount}
            onChange={(e) => setLimitAmount(e.target.value)}
            className="budget-input"
            required
          />
        </div>
        <div>
          <label className="budget-label">Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="budget-select"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <button type="submit" className="budget-button">
          Set Budget Limit
        </button>
      </form>

      <h3 className="budget-subtitle">Current Budget Limits</h3>
      {budgetLimits.length > 0 ? (
        <table className="budget-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Limit</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {budgetLimits.map((limit) => (
              <tr key={limit.id}>
                <td>{limit.category}</td>
                <td>${limit.limit_amount}</td>
                <td>{limit.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-limits">No budget limits set yet.</p>
      )}
    </div>
  );
};

export default BudgetLimits;
