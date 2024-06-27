import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>My React Website &copy; 2024</p>
      <style jsx>{`
        footer {
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
