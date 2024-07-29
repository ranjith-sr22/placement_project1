import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordManager = ({ token }) => {
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.get('http://localhost:5000/passwords', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPasswords(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPasswords();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/passwords', { website, username, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswords([...passwords, { website, username, password }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <ul>
        {passwords.map((p, index) => (
          <li key={index}>
            <strong>{p.website}</strong>: {p.username} / {p.password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordManager;
