import { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('soumo');
  const [password, setPassword] = useState('soumo');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch {
      alert('Login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <p style={{ marginTop: '10px' }}>
  <a href="/reset-password" style={{ color: '#007bff' }}>
    Forgot password?
  </a>
</p>

      </div>
    </div>
    
  );
}
