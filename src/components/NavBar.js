import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ setFilter }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const navigate = useNavigate();

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setFilter(filter);
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <a 
            href="#" 
            onClick={() => handleFilterClick(null)} 
            className={activeFilter === null ? 'active' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleFilterClick(5)} 
            className={activeFilter === 5 ? 'active' : ''}
          >
            5 Stars
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleFilterClick(4)} 
            className={activeFilter === 4 ? 'active' : ''}
          >
            4 Stars
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleFilterClick(3)} 
            className={activeFilter === 3 ? 'active' : ''}
          >
            3 Stars
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleFilterClick(2)} 
            className={activeFilter === 2 ? 'active' : ''}
          >
            2 Stars
          </a>
        </li>
        <li>
          <a 
            href="#" 
            onClick={() => handleFilterClick(1)} 
            className={activeFilter === 1 ? 'active' : ''}
          >
            1 Star
          </a>
        </li>
      </ul>
      <style jsx>{`
        nav {
          padding: 10px;
          background-color: #f8f9fa;
        }
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: space-around;
        }
        li {
          margin: 0 10px;
        }
        a {
          text-decoration: none;
          color: #007bff;
          cursor: pointer;
        }
        a.active {
          font-weight: bold;
          color: #0056b3;
          border-bottom: 2px solid #0056b3;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
