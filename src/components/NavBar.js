import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ setFilter, handleCartButtonClick }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage the hamburger menu
  const navigate = useNavigate();

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setFilter(filter);
    navigate('/');
    setMenuOpen(false); // Close the menu when a filter is clicked
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open/close state
  };

  return (
    <nav>
      <div className="nav-content">
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={menuOpen ? 'open' : ''}>
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
        <button className="cart-button" onClick={handleCartButtonClick}>Cart</button> {/* Cart button */}
      </div>
      <style jsx>{`
        nav {
          padding: 10px;
          background-color: black;
          position: relative;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hamburger {
          display: none;
          cursor: pointer;
          color: white;
          font-size: 24px;
        }
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: space-around;
          margin: 0;
        }
        ul.open {
          display: block;
          position: absolute;
          top: 60px;
          left: 0;
          width: 50%;
          background-color: black;
          flex-direction: column;
          align-items: center;
          border-radius: 5px ;
        }
        li {
          margin: 0 10px;
        }
        a {
          text-decoration: none;
          color: white;
          cursor: pointer;
        }
        ul.open a {
          color: white;
        }
        a.active {
          font-weight: bold;
          color: #0056b3;
          border-bottom: 2px solid #0056b3;
        }
        a:hover {
          text-decoration: underline;
        }
        .cart-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }
        .cart-button:hover {
          background-color: #0056b3;
        }
        @media (max-width: 768px) {
          nav{
            
          }
          .hamburger {
            display: block;
          }
          ul {
            display: ${menuOpen ? 'block' : 'none'};
            position: absolute;
            top: 40px;
            left: 0;
            width: 100%;
            
            flex-direction: column;
            align-items: center;
          }
          li {
            margin: 30px 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
