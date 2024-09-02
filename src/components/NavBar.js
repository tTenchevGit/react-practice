
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import { auth } from '../firebaseConfig';


const NavBar = ({ setFilter, handleCartButtonClick, toggleTheme, user }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);
  console.log('NavBar rendered', { user });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.classList.contains('hamburger')) {
        setMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.classList.contains('profile-photo')) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setFilter(filter);
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setDropdownVisible(false); 
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
    setMenuOpen(false); 
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <nav>
      <div className="nav-content">
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <ul ref={menuRef} className={menuOpen ? 'open' : ''}>
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
          <li>
            <a className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </a>
          </li>
        </ul>
        <div className='userPhoto' ref={dropdownRef}>
  {user ? (
    <div className="profile-container" onClick={toggleDropdown}>
      <img style={{ maxWidth: '50px' }} src="https://as2.ftcdn.net/v2/jpg/03/01/37/81/1000_F_301378128_CNipnqxgozfbclphnmH86cYmKMSc9JfC.jpg" alt="Profile" className="profile-photo" />
      {dropdownVisible && (
        <div className="dropdown-menu">
          <button onClick={handleLogout}>Logout</button>
          <Link className='whish' to="/whish">Wishlist</Link>
        </div>
      )}
    </div>
  ) : (
    <div className="auth-buttons">
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  )}
</div>
        <button className="cart-button" onClick={handleCartButtonClick}>Cart</button>
      </div>
      <style jsx>{`
        .profile-container {
          position: relative; 
        }

        .whish{
        background-color: #007bff;
          color: white;
          border: none;
          padding: 5px;
          cursor: pointer;
          border-radius: 5px;
          margin-left: 10px;
          }

        .dropdown-menu {
          position: absolute; 
          top: 100%; 
          right: 0; /* Align it to the right */
          background-color: white; 
          border: 1px solid #ccc; 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
          z-index: 1000;
          padding: 10px; 
        }

        .userPhoto {
          position: relative;
          max-width: 50px;
        }
      
        nav {
          padding: 10px;
          background-color: ${isDarkMode ? 'white' : 'black'};
          color: ${isDarkMode ? 'white' : 'black'};
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
          color: ${isDarkMode ? 'black' : 'white'};
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
          border-radius: 5px;
        }

        li {
          margin: 0 10px;
        }

        a {
          text-decoration: none;
          color: ${isDarkMode ? 'black' : 'white'};
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
          margin-right: 35px;
        }

        .cart-button:hover {
          background-color: #0056b3;
        }

        .theme-toggle {
          margin-right: 10px;
          padding: 5px 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .theme-toggle:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          .cart-button {
            margin-right: 35px;
          }

          nav {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
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
