import React, { useState } from 'react';
import { queryArea } from './api';
import ChartComponent from './components/ChartComponent';
import TableComponent from './components/TableComponent';
import './App.css'; // Import custom CSS

function App() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [chart, setChart] = useState(null);
  const [table, setTable] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await queryArea(input);
      setSummary(res.data.summary);
      setChart(res.data.chart);
      setTable(res.data.table);
    } catch (err) {
      console.error(err);
      alert('Error querying backend. Is your backend running on http://localhost:8000 ?');
    }
  };

  return (
    <div className="main-wrapper">
      {/* HEADER */}
      <header className="header-section">
        <h1>🏡 Real Estate Analysis Chatbot</h1>
        <p>Type a location and get summary, charts & insights</p>
      </header>

      {/* CONTENT CARD */}
      <div className="content-card">

        {/* Input Form */}
        <form onSubmit={onSubmit} className="input-form">
          <div className="input-box">
            <input
              className="input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Wakad or Wakad,Akurdi"
            />
            <button className="analyze-btn" type="submit">
              Analyze
            </button>
          </div>
        </form>

        {/* Summary Section */}
        <div className="section">
          <h3>📌 Summary</h3>
          <div className="summary-box">{summary || "No summary yet. Try searching!"}</div>
        </div>

        {/* Chart Section */}
        {chart && (
          <div className="section">
            <h3>📊 Price Trend Chart</h3>
            <div className="chart-box">
              <ChartComponent chartData={chart} />
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="section">
          <h3>📋 Filtered Table</h3>
          <div className="table-box">
            <TableComponent data={table} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
