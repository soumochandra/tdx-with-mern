


import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://api.mfapi.in/mf/search?q=${query}`);
      setFunds(res.data || []);
    } catch {
      alert('Search failed. Try again.');
    }
    setLoading(false);
  };

  const save = async (fund) => {
    if (!token) {
      alert("Please log in to save mutual funds.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/save', { fund }, {
        headers: { Authorization: token }
      });
      alert('Fund saved!');
    } catch {
      alert("Error saving fund. Login again.");
    }
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <h1>Mutual Fund App</h1>
        <div className="nav-links">
          {token ? (
            <>
              <button onClick={() => navigate('/saved')}>Saved</button>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search mutual funds..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>

      {loading && <p className="loading-text">Searching...</p>}

      {funds.length > 0 && (
        <div className="results">
          {funds.map((f, i) => (
            <div key={i} className="result-card">
              <p>{f.schemeName}</p>
              <button onClick={() => save(f)}>Save</button>
            </div>
          ))}
        </div>
      )}

      {!loading && query && funds.length === 0 && (
        <p className="no-results">No results found.</p>
      )}
    </div>
  );
}
