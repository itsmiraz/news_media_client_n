import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import UserContext from './Context/UserContext';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './Features/api/apiSlice';
import NewssContext from './Context/NewssContext';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <NewssContext>
          <ApiProvider api={apiSlice}>
            <App />
          </ApiProvider>
        </NewssContext>
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);


