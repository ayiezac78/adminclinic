import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import axios from 'axios'
import Header from './common/Header'

axios.defaults.baseURL = 'https://clinicapi.tech/api';
axios.defaults.headers.post['Authorization'] = 'Bearer ' + localStorage.getItem('token');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
)
