import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import './premium.css';
const root=ReactDOM.createRoot(document.getElementById('root')!);
const render=()=>root.render(<React.StrictMode><App key={window.location.hash}/></React.StrictMode>);
render();window.addEventListener('hashchange',render);
