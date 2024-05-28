// import React, { useState } from 'react';
// import './SearchForm.css'

// function SearchForm({ onSearch, onDateChange }) {
//   const [query, setQuery] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);
//     onDateChange(date);
//   };

//   return (
//     <form onSubmit={handleSubmit} className='search-form'>
//       <input
//         type="date"
//         value={selectedDate}
//         onChange={handleDateChange}
//         className='search-input'
//       />
//       <input
//         type="text"
//         placeholder="Search for clubs or players"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="search-input"
//       />
//       <button className='search-button' type="submit">Search</button>
//     </form>
//   );
// }

// export default SearchForm;

import React, { useState } from 'react';
import './SearchForm.css'

function SearchForm({ onSearch, onDateChange, onLogin, onSignup }) {
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className='search-form'>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className='search-input'
        />
        <input
          type="text"
          placeholder="Search for clubs or players"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button className='search-button' type="submit">Search</button>
      </form>
 
    </div>
  );
}

export default SearchForm;
