// Register.js
import { useState } from 'react';
import axios from 'axios';
import './Register.css'; // 👈 Import your CSS

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('Registered successfully');
    } catch {
      alert('Failed to register');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}
