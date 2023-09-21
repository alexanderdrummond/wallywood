import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <hr className="footer-divider" />
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-row">WALLYWOOD</div>
          <div className="footer-row">Øster Uttrup Vej 1</div>
          <div className="footer-row">9000 Aalborg</div>
        </div>
        <div className="footer-column">
          <div className="footer-row">CVR: 12345678</div>
          <div className="footer-row">MAIL: info@plakatshoppen.dk</div>
          <div className="footer-row">MOBIL: +45 9812 3456</div>
        </div>
        <div className="social-icons">
          <img src="https://static.vecteezy.com/system/resources/previews/022/257/063/non_2x/icon-media-social-facebook-free-vector.jpg" alt="Social icon 1" className="social-icon" />
          <img src="https://static.vecteezy.com/system/resources/previews/022/257/063/non_2x/icon-media-social-facebook-free-vector.jpg" alt="Social icon 2" className="social-icon" />
          <img src="https://static.vecteezy.com/system/resources/previews/022/257/063/non_2x/icon-media-social-facebook-free-vector.jpg" alt="Social icon 3" className="social-icon" />
          <img src="https://static.vecteezy.com/system/resources/previews/022/257/063/non_2x/icon-media-social-facebook-free-vector.jpg" alt="Social icon 4" className="social-icon" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
