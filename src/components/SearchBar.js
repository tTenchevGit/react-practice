// SearchBar.js
import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Handle input change to update search query
        placeholder="Search for products..."
      />
      <style jsx>{`
        .search-bar {
         
          margin: 20px auto;
          margin-top: 125px;
          max-width: 600px;
          text-align: center;
        }
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
