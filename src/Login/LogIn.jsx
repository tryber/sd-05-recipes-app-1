import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import storage from '../Services/LocalStorage';
import './login.css';

function LogIn({ history }) {
  const [validEmail, setValidEmail] = useState('');
  const [password, setPassord] = useState('');
  const [email1, setEmail] = useState('');

  // referencia: a string de RegEx eu copiei do stackOverflow (https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    setValidEmail(re.test(email));
    setEmail(email);
  }

  function handleClick() {
    storage.clearStorage();
    storage.initStorage();
    storage.setValueByKey('user', { email: email1 });
    storage.setValueByKey('mealsToken', 1);
    storage.setValueByKey('cocktailsToken', 1);
    history.push('/comidas');
  }

  useEffect(() => {
    storage.clearStorage();
    const button = document.getElementById('submit-btn');
    if (validEmail && password.length > 6) {
      button.disabled = false;
      button.addEventListener('click', () => handleClick());
    } else {
      button.disabled = true;
    }
  });

  return (
    <div className="login-container deep-orange lighten-3">
      <div className="inputs-container">
        <input
          type="email"
          placeholder="email"
          className="inputs"
          onChange={(event) => validateEmail(event.target.value)}
          data-testid="email-input"
          required
        />
        <input
          type="password"
          placeholder="senha"
          className="inputs"
          data-testid="password-input"
          onChange={(event) => setPassord(event.target.value)}
          required
        />
      </div>
      <button
        id="submit-btn"
        data-testid="login-submit-btn"
        className="waves-effect waves-light btn-large"
        disabled
      >
        Entrar
      </button>
    </div>
  );
}

LogIn.propTypes = {
  fetchToken: PropTypes.func,
}.isRequired;

export default withRouter(LogIn);
