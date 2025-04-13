import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome';
import BudgetLimits from './components/BudgetLimits';
import AIQuery from './components/AIQuery';
import FinancialInsights from './components/FinancialInsights';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Personal Finance Assistant</h1>

        <div className="tab-buttons">
          <NavLink to="/expenses" className="tab-button">
            Expenses
          </NavLink>
          <NavLink to="/income" className="tab-button">
            Income
          </NavLink>
          <NavLink to="/budgets" className="tab-button">
            Budget Limits
          </NavLink>
          <NavLink to="/insights" className="tab-button">
            Insights
          </NavLink>
          <NavLink to="/ai" className="tab-button">
            AI Assistant
          </NavLink>
        </div>

        <Routes>
          <Route path="/expenses" element={<AddExpense />} />
          <Route path="/income" element={<AddIncome />} />
          <Route path="/budgets" element={<BudgetLimits />} />
          <Route path="/insights" element={<FinancialInsights />} />
          <Route path="/ai" element={<AIQuery />} />
          <Route path="*" element={<AddExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
