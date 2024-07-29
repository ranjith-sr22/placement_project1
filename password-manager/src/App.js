import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import PasswordManager from './PasswordManager';
import './App.css';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <div>
      {token ? (
        <PasswordManager token={token} />
      ) : (
        <>
          <Register />
          <Login setToken={setToken} />
        </>
      )}
      
    </div>
  );
};

export default App;
