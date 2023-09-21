import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('session'));
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });
  
  useEffect(() => {
    const updateCart = () => {
      setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
    };
  
    window.addEventListener('cart-updated', updateCart);
  
    return () => {
      window.removeEventListener('cart-updated', updateCart);
    };
  }, []);
  
  const updateCartItem = (posterId, quantity) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex((item) => item.id === posterId);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };
  
  const deleteCartItem = (posterId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((item) => item.id !== posterId);
  
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };
  

  return (
    <header className="header">
      <div className="logo">WALLYWOOD</div>
      <nav className="menu">
        <Link to="/">HOME</Link>
        <Link to="/plakater">PLAKATER</Link>
        <Link to="/omos">OM OS</Link>
        <Link to="/kontakt">KONTAKT</Link>
        <Link to="/login">LOGIN</Link>
      </nav>
      <div className="cart" onClick={() => setIsCartOpen(!isCartOpen)}>
        <div className="cart-icon"><img src="cart.svg" /></div>
        {isCartOpen && (
        <div className="cart-dropdown">
          {cartItems.length > 0 ? cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-icon" />
              <div className="cart-item-details">
                <div>{item.name}</div>
                <div>{item.price} DKK x {item.quantity}</div>
              </div>
              <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => deleteCartItem(item.id)}>Remove</button>
            </div>
          )) : <div>No items in cart</div>}
        </div>
      )}
      </div>
      <div className="divider"></div>
    </header>
  );  
}

export default Header;
