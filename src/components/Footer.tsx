import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Highway Delite</h3>
            <p className="text-gray-400 text-sm">
              Curated travel experiences with certified guides. 
              Safety first, adventure always.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Experiences</a></li>
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@highwaydelite.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: Bangalore, Karnataka</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Highway Delite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
