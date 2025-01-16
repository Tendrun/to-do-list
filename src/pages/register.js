import '.././App.css';
import api from '../api/axiosConfig.js';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Importowanie hooka do nawigacji

function RegisterPage() {
  const [email, setEmail] = useState(''); // Stan do przechowywania wartości e-mail
  const [password, setPassword] = useState(''); // Stan do przechowywania hasła
  const [responseMessage, setResponseMessage] = useState(''); // Wiadomość zwrotna dla użytkownika
  const [VerifyValue, SetVerifedValue] = useState(null); // Wartość walidacji z ReCAPTCHA
  const { t } = useTranslation(); // Hook do tłumaczeń
  const navigate = useNavigate(); // Hook do nawigacji po stronach

  const handleRegister = async (e) => {
    e.preventDefault(); // Zapobieganie domyślnemu odświeżeniu strony przy submit

    try {
      // Wysyłanie danych rejestracyjnych do API
      const response = await api.post('http://localhost:8080/api/v1/auth/Register', {
        headers: {
          'Content-Type': 'application/json'
        },
        username: email,
        password: password,
      });

      setResponseMessage('registerSuccess'); // Ustawienie wiadomości o sukcesie
      setTimeout(() => navigate('/'), 1000); // Przekierowanie użytkownika po 1 sekundzie
    } catch (error) {
      console.error('Error during Register:', error); // Logowanie błędów do konsoli
      setResponseMessage('registerFailed'); // Ustawienie wiadomości o niepowodzeniu
    }
  };

  return (
    <div className="App">
      <h1>{t('register.title')}</h1>
      {/* Formularz rejestracji */}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">{t('register.emailLabel')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Aktualizacja stanu dla e-mail
            required
          />
        </div>
        <div>
          <label htmlFor="password">{t('register.passwordLabel')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Aktualizacja stanu dla hasła
            required
          />
        </div>
        <div align="center">
          {/* ReCAPTCHA do weryfikacji użytkownika */}
          <ReCAPTCHA
            sitekey="6LfIy64qAAAAAFiaiLzzlCVAJgj2zawU1JXXr_X1"
            onChange={(val) => SetVerifedValue(val)} // Ustawienie wartości weryfikacji
          />
        </div>
        {/* Przycisk aktywowany dopiero po walidacji ReCAPTCHA */}
        <button disabled={!VerifyValue} type="submit">{t('register.registerButton')}</button>
      </form>
      {/* Wyświetlanie wiadomości zwrotnej */}
      {responseMessage && <p>{t(`register.${responseMessage}`)}</p>}
    </div>
  );
}

export default RegisterPage;
