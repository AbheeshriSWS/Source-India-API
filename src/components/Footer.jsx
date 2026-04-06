import React from 'react';

function Footer(){
    return (
        <>
            <footer className="footer-section">
      <div className="container py-5">
        {/* Top Section */}
        <div className="row align-items-center mb-4">
          
          {/* Left Logo */}
          <div className="col-md-3 mb-3 mb-md-0">
            <p className="small-title">Developed and Managed by</p>
            <img
              src="/footer.jpg"
              alt="ELCINA"
              className="img-fluid size-300-80" 
            />
          </div>

          {/* Center Content */}
          <div className="col-md-6 mb-3 mb-md-0">
            <h6 className="footer-heading">
              ELECTRONIC INDUSTRIES ASSOCIATION OF INDIA (ELCINA)
            </h6>
            <p className="footer-text">
              Our focus is to support the value chain for Consumer Electronics,
              Telecom and Computers/ IT correlating their common interest with
              that of equipment, material and machinery producers for expansion
              of manufacturing.
            </p>
          </div>

          {/* Right Logos */}
          <div className="col-md-3 text-md-end">
            <p className="small-title">Supporting Associations</p>
            <div className="d-flex justify-content-md-end gap-2">
              <img
                src="/footer.jpg"
                alt="MAIT"
                className="img-fluid size-80-40"
              />
              <img
                src="/footer.jpg"
                alt="CIMEI"
                className="img-fluid size-80-40"
              />
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Bottom Links */}
        <div className="row pt-3">
          
          {/* Column 1 */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="footer-subtitle">Need Help?</h6>
            <ul className="footer-list">
              <li>Terms & Conditions</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Support</li>
              <li>Knowledge Center</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="footer-subtitle">Policy</h6>
            <ul className="footer-list">
              <li>Schemes for Electronics Manufacturing</li>
              <li>State ESDM Policies</li>
              <li>Union Budget for ESDM sector</li>
              <li>Foreign Trade Policy 2015-20</li>
              <li>Duty Draw Back</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="footer-subtitle">Quick Links</h6>
            <ul className="footer-list">
              <li>For Exporters</li>
              <li>Work With Us</li>
              <li>Subscription Plans</li>
              <li>Test Labs in India</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="footer-subtitle">Contact Us</h6>
            <ul className="footer-list">
              <li>📞 +91-11-41615985 / +91-11-41011291</li>
              <li>✉️ support@sourceindia-electronics.com</li>
              <li>
                📍 Elcina House, 422, Okhla Industrial Estate, Phase-III,
                New Delhi, Delhi 110020
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom text-center py-2">
        © Copyright 2026 <strong>ELCINA</strong>. All Rights Reserved
      </div>
    </footer>
        </>
    );
}

export default Footer;    