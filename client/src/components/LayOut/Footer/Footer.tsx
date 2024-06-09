import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="bg-[#4D2C22] p-5 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="flex-1 min-w-[200px] p-2.5">
              <h3>About NKBEATS</h3>
              <p>Your top choice for musical instruments, offering unrivaled selection, expert guidance, and unbeatable prices.</p>
            </div>
            <div className="flex-1 min-w-[200px] p-2.5">
              <h3>Quick Links</h3>
              <ul className="list-none p-0">
                <li><a href="/home" className="text-white no-underline">Home</a></li>
                <li><a href="/about" className="text-white no-underline">About Us</a></li>
                <li><a href="/products" className="text-white no-underline">Products</a></li>
                <li><a href="/contact" className="text-white no-underline">Contact Us</a></li>
              </ul>
            </div>
            <div className="flex-1 min-w-[200px] p-2.5">
              <h3>Contact Us</h3>
              <p>123 Music Avenue, Rhythm City, USA</p>
              <p>Email: info@nkbeats.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-5 border-t border-white pt-2.5">
            <p>&copy; 2024 NKBEATS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
