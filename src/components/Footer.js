import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';



const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <footer>
      <p>My React Website &copy; 2024</p>
      <style jsx>{`
        footer {
          color : ${isDarkMode ? 'black' : 'white'} !important;
          background-color: ${isDarkMode ? 'white' : 'black'};
          margin-top: 20px;
          padding: 10px;
         
          text-align: center;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
