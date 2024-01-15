import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from '../src/redux/store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Use this for wrapping context, ect...
function Root () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
