import React from 'react';
import './Kontakt.css';

function Kontakt() {
  return (
    <div className="kontakt-container">
      <h1>Kontakt os</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Dit navn <span className="required">*</span></label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Din email <span className="required">*</span></label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Din besked <span className="required">*</span></label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Kontakt;
