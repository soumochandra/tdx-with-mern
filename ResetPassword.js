

import { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';

export default function ResetPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async () => {
    try {
      await axios.post('http://localhost:5000/reset-password', {
        username,
        newPassword
      });
      alert('Password reset successfully. Please login.');
    } catch (err) {
      alert('Reset failed. Check username.');
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="New Password"
          type="password"
          onChange={e => setNewPassword(e.target.value)}
        />
        <button onClick={handleReset}>Reset Password</button>
      </div>
    </div>
  );
}
