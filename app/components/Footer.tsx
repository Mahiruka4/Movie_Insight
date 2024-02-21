import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { IconContext } from 'react-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold mr-3">Movie Insight</h2>
          <p className="text-sm">© 2024 Movie Insight. All rights reserved.</p>
        </div>
        <div className="flex mb-4 space-x-4">
          <a href="#" className="text-white hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Contact
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Privacy Policy
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-400">
            <IconContext.Provider value={{ size: '1.5em' }}>
              <FiFacebook />
            </IconContext.Provider>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <IconContext.Provider value={{ size: '1.5em' }}>
              <FiTwitter />
            </IconContext.Provider>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <IconContext.Provider value={{ size: '1.5em' }}>
              <FiInstagram />
            </IconContext.Provider>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
