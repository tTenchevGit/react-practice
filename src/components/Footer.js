import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';



const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <footer>
      <p>My React Website &copy; 2024</p>
      <style jsx>{`
        footer {
          color : ${isDarkMode ? 'black' : 'black'} !important;
          margin-top: 20px;
          padding: 10px;
          background-color: #f1f1f1;
          text-align: center;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
