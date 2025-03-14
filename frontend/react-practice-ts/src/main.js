import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './store.ts';
createRoot(document.getElementById('root')).render(_jsx(Provider, { store: store, children: _jsx(PersistGate, { loading: null, persistor: persistor, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }) }));
