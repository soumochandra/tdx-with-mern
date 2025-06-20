

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SavedFunds() {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/saved', {
        headers: { Authorization: token }
      });
      setFunds(res.data);
    };
    fetchFunds();
  }, []);

  return (
    <div>
      <h2>Saved Funds</h2>
      {funds.map((f, i) => (
        <div key={i}>{f.schemeName}</div>
      ))}
    </div>
  );
}
