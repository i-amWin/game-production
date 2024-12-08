import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import { App } from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { GuestLayout } from './layouts/guest-layout.tsx';
import { Login } from '@/pages/auth/login.tsx';
import { Register } from '@/pages/auth/register.tsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CONSTANTS } from './constants.ts';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Helmet>
            <title>{CONSTANTS.APP_NAME}</title>
          </Helmet>
          <Routes>
            <Route path="/" element={<App />} />
            <Route element={<GuestLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
