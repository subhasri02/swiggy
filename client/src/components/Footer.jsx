

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-orange-50 to-yellow-50 pt-16">
      {/* Floating Glass Cards */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-20">
        {/* Branding Card */}
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 flex flex-col items-center md:items-start transform transition hover:-translate-y-2 hover:scale-105 duration-300">
          {/*<img src="/path/to/logo.png" alt="Logo" className="h-14 mb-4" />*/}
          <p className="text-gray-800 font-semibold text-center md:text-left">
            Bringing you delicious meals <br /> delivered to your doorstep!
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-orange-500 hover:text-orange-600 text-xl shadow-lg p-2 rounded-full transition duration-300 hover:scale-110">
              <FaFacebookF />
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-600 text-xl shadow-lg p-2 rounded-full transition duration-300 hover:scale-110">
              <FaTwitter />
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-600 text-xl shadow-lg p-2 rounded-full transition duration-300 hover:scale-110">
              <FaInstagram />
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-600 text-xl shadow-lg p-2 rounded-full transition duration-300 hover:scale-110">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Company Links Card */}
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 transform transition hover:-translate-y-2 hover:scale-105 duration-300">
          <h5 className="text-gray-800 font-bold text-xl mb-4">Company</h5>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Careers</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Blog</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Support Links Card */}
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 transform transition hover:-translate-y-2 hover:scale-105 duration-300">
          <h5 className="text-gray-800 font-bold text-xl mb-4">Support</h5>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-orange-500 transition">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-4 rounded-t-xl shadow-inner">
        <p className="text-sm font-semibold">&copy; 2025 FoodApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
