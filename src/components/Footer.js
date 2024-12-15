import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookSquare, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-[#5b2a29] py-8">
      <div className="container mx-auto px-6 md:px-16 lg:px-28">
        <div className="flex flex-wrap lg:gap-7 gap-5 justify-start items-center">

          {/* Links Section 1 */}
          <div className="flex flex-col items-start">
            <NavLink to="/commonnumber" className="text-white hover:underline">View Common Numbers</NavLink>
          </div>

          {/* Links Section 2 */}
          <div className="flex flex-col items-start">
            <NavLink to="/vipnumber" className="text-white hover:underline">View VIP Numbers</NavLink>
          </div>

          {/* Privacy Section */}
          <div className="flex flex-col items-start">
            <NavLink to="/history" className="text-white hover:underline">View Result History</NavLink>
          </div>

          <div className="flex flex-col items-start">
            <NavLink to="/privacy" className="text-white hover:underline">Read Privacy Policy</NavLink>
          </div>

          <div className="flex flex-col items-start">
            <NavLink to="/contact" className="text-white hover:underline">Get in Touch</NavLink>
          </div>

          <div className="flex items-start gap-2 ">
            <FaFacebookSquare color='blue' className='bg-white p-1 rounded-full' size={30} />
            <FaWhatsapp color='green' className='bg-white p-1 rounded-full' size={30} />
          </div>

        </div>
      </div>

      <div className="text-center text-gray-500 mt-8">
        <p>Copyright © 2024 Shillong Teer Results. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
