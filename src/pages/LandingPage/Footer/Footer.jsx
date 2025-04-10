import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import kuriftuWater from "../../../assets/images/Hotel/kuriftuWater.webp";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    About: [
      { name: "Our Story", href: "/about" },
      { name: "Locations", href: "/locations" },
      { name: "Careers", href: "/careers" },
    ],
    Experiences: [
      { name: "Accommodations", href: "/rooms" },
      { name: "Dining", href: "/dining" },
      { name: "Spa & Wellness", href: "/spa" },
    ],
    Support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Booking Policy", href: "/booking-policy" },
    ],
  };

  const socialLinks = [
    {
      icon: <FaFacebook />,
      href: "https://facebook.com/kuriftu",
      label: "Facebook",
    },
    {
      icon: <FaTwitter />,
      href: "https://twitter.com/kuriftu",
      label: "Twitter",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/kuriftu",
      label: "Instagram",
    },
    {
      icon: <FaLinkedin />,
      href: "https://linkedin.com/company/kuriftu",
      label: "LinkedIn",
    },
    {
      icon: <FaYoutube />,
      href: "https://youtube.com/kuriftu",
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50/50 to-white text-gray-600 relative">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iI2YzZjRmNiIvPjwvZz48L3N2Zz4=')] opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img
                src={kuriftuWater}
                alt="Kuriftu Logo"
                className="h-10 w-auto filter brightness-0 opacity-70"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Where luxury meets authenticity. Experience the perfect blend of
              traditional Ethiopian hospitality and modern comfort.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-gray-800 font-medium text-sm mb-3">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-500 hover:text-yellow-600 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-gray-800 font-medium text-sm">
                Stay Updated
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                Subscribe to our newsletter for exclusive offers
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 md:w-64 px-3 py-2 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-md font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
          {isSubscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-2 text-yellow-600 text-xs"
            >
              Thank you for subscribing.
            </motion.div>
          )}
        </div>

        {/* Contact Information */}
        <div className="py-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-yellow-500 text-sm" />
                <span className="text-sm">+251 911 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-yellow-500 text-sm" />
                <span className="text-sm">info@kuriftu.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-yellow-500 text-sm" />
                <span className="text-sm">Addis Ababa, Ethiopia</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Kuriftu Resorts & Spa. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
