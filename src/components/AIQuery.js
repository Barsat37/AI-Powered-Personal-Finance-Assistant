import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AIQuery.css'; 

const AIQuery = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState([]);

  useEffect(() => {
    const savedQueries = localStorage.getItem('recentQueries');
    if (savedQueries) {
      setRecentQueries(JSON.parse(savedQueries));
    }
  }, []);

  const saveQuery = (question, answer) => {
    const newQueries = [
      { question, answer, timestamp: new Date().toISOString() },
      ...recentQueries.slice(0, 4),
    ];
    setRecentQueries(newQueries);
    localStorage.setItem('recentQueries', JSON.stringify(newQueries));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a question for the AI assistant.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8001/ask-ai/', { query });

      if (response.data.response) {
        setAiResponse(response.data.response);
        saveQuery(query, response.data.response);
        setError('');
      } else if (response.data.error) {
        setError(response.data.error);
      } else {
        setError('AI could not process the query. Please try again.');
      }
    } catch (err) {
      console.error('Error communicating with AI:', err);
      setError('Something went wrong while fetching AI response.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryClick = (question) => {
    setQuery(question);
  };

  return (
    <div className="ai-container">
      <div className="ai-box">
        <h2 className="ai-title">AI Financial Assistant</h2>

        {error && <div className="ai-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="ai-label" htmlFor="query">
            Ask about your finances or get advice
          </label>
          <textarea
            id="query"
            rows="4"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ai-textarea"
            placeholder="Example: How much did I spend on groceries last month?"
          />
          <button
            type="submit"
            className="ai-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Getting advice...' : 'Ask AI'}
          </button>
        </form>

        {aiResponse && (
          <div className="ai-response-box">
            <h3>Financial Advice:</h3>
            <p>{aiResponse}</p>
          </div>
        )}

        {recentQueries.length > 0 && (
          <div className="ai-recent">
            <h3>Recent Questions</h3>
            {recentQueries.map((item, index) => (
              <div key={index} className="ai-query-item">
                <p onClick={() => handleQueryClick(item.question)}>
                  {item.question}
                </p>
                <span>{new Date(item.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="ai-suggested">
          <h3>Suggested Questions</h3>
          <div className="ai-suggestions">
            {[
              "How much did I spend last month?",
              "What's my biggest expense category?",
              "How can I improve my savings?",
              "Am I on track with my budget?",
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => handleQueryClick(question)}
                className="ai-suggestion-btn"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuery;
