import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('session'));
  const [isRegister, setIsRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const onLogin = () => {
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ username, password }),
    })
      .then(response => response.text())
      .then((token) => {
        const parsedToken = JSON.parse(token);
        if (parsedToken && parsedToken.access_token) {
          setIsLoggedIn(true);
          localStorage.setItem('session', JSON.stringify({ token: parsedToken.access_token, username }));
          console.log('Token:', parsedToken.access_token);
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  const onRegister = () => {
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        org_id: '1',
        is_active: '1',
      }),
    })
      .then(response => response.text())
      .then((response) => {
        if (response) {
          alert('Registration successful');
        } else {
          alert('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegister) {
      onRegister();
    } else {
      if (!isLoggedIn) {
        onLogin();
      }
    }
  };

  return (
    <div className="login-container">
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      {isLoggedIn ? (
        <div>
          <p>You're already logged in</p>
          <div className="button-container">
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="username">{isRegister ? 'Email' : 'Username'} <span className="required">*</span></label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={isRegister ? email : username}
              onChange={(e) => (isRegister ? setEmail(e.target.value) : setUsername(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className="required">*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            {!isLoggedIn && (
              <button onClick={() => setIsRegister((prev) => !prev)}>
                {isRegister ? 'Go to Login' : 'Register'}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;