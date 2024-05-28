import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import moment from 'moment';
import SearchForm from './SearchForm';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Matches from './Matches';
import Profile from './Profile';
import Settings from './Settings';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);

  useEffect(() => {
    const fetchData = async (date) => {
      try {
        setLoading(true);
        const baseUrl = process.env.REACT_APP_API_URL;  // Ensure this points to your backend server
        const response = await fetch(`/api/matches?date=${date}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMatches(data.matches);
        setFilteredMatches(data.matches);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData(selectedDate);
  }, [selectedDate]);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = matches.filter(({ homeTeam, awayTeam }) =>
      homeTeam.name.toLowerCase().includes(lowerCaseQuery) ||
      awayTeam.name.toLowerCase().includes(lowerCaseQuery) ||
      (homeTeam.players?.some(player => player.name.toLowerCase().includes(lowerCaseQuery))) || 
      (awayTeam.players?.some(player => player.name.toLowerCase().includes(lowerCaseQuery)))
    );
    setFilteredMatches(filtered);
  };

  return (
    <Router>
      <div className='container'>
        <h1>Soccer Match Search</h1>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="/signup">Create Account</Link> | 
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/profile">Profile</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <SearchForm onSearch={handleSearch} onDateChange={setSelectedDate} />
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div>
                  {filteredMatches.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Home Team</th>
                          <th>Away Team</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMatches.map(({ id, homeTeam, awayTeam, utcDate }) => {
                          const matchDate = moment(utcDate).format('LL');
                          const matchTime = moment(utcDate).format('LT');

                          return (
                            <tr key={id}>
                              <td>{homeTeam.name}</td>
                              <td>{awayTeam.name}</td>
                              <td>{matchDate}</td>
                              <td>{matchTime}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p>No matches found.</p>
                  )}
                </div>
              )}
            </>
          } />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/matches" element={<Matches matches={filteredMatches} />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
