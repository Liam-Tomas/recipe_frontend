import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB356cA_2HnP9ofceOutWVXjqYiOr2eFJA",
  authDomain: "recipe-tracker-1994.firebaseapp.com",
  projectId: "recipe-tracker-1994",
  storageBucket: "recipe-tracker-1994.appspot.com",
  messagingSenderId: "594301517859",
  appId: "1:594301517859:web:7d64c3b048c23d0d56b196",
  measurementId: "G-6FB2R9ZYB5"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
