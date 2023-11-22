import React from 'react';
import {HashRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './firebase/firebase.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <App/>
    </HashRouter>
);
