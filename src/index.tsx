import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App';

// issue remove strict mode
// https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

ReactDOM.createRoot(document.getElementById('root') as Element).render(<App />);

