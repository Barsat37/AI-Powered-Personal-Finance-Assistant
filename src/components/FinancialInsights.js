import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinancialInsights.css';

const FinancialInsights = () => {
  const [categorySpending, setCategorySpending] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategorySpending();
    fetchMonthlySpending();
  }, []);

  const fetchCategorySpending = async () => {
    try {
      const response = await axios.get('http://localhost:8001/insights/spending-by-category');
      setCategorySpending(response.data);
    } catch (error) {
      console.error('Error fetching category spending:', error);
    }
  };

  const fetchMonthlySpending = async () => {
    try {
      const response = await axios.get('http://localhost:8001/insights/monthly-spending');
      setMonthlySpending(response.data);
    } catch (error) {
      console.error('Error fetching monthly spending:', error);
    }
  };

  const getAiAnalysis = async () => {
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8001/insights/ai-analysis');
      setAiAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error getting AI analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insights-container">
      <h2 className="insights-title">Financial Insights</h2>
      
      <div className="insights-section">
        <div>
          <h3 className="insights-heading">Spending by Category</h3>
          {categorySpending.length > 0 ? (
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {categorySpending.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No spending data available.</p>
          )}
        </div>
        
        <div>
          <h3 className="insights-heading">Monthly Spending</h3>
          {monthlySpending.length > 0 ? (
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {monthlySpending.map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No monthly spending data available.</p>
          )}
        </div>
      </div>
      
      <div className="ai-section">
        <h3 className="insights-heading">AI Financial Analysis</h3>
        <button 
          onClick={getAiAnalysis} 
          className="ai-button"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Get AI Analysis'}
        </button>
        
        {aiAnalysis && (
          <div className="ai-result">
            <p>{aiAnalysis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialInsights;
