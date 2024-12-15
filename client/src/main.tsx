import { Toaster } from 'sonner';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Login } from '@/pages/auth/login.tsx';
import { Register } from '@/pages/auth/register.tsx';

import { App } from './App.tsx';
import { CONSTANTS } from './constants.ts';
import './index.css';
import { AuthenticatedLayout } from './layouts/authenticated-layout.tsx';
import { GuestLayout } from './layouts/guest-layout.tsx';
import { Home } from './pages/user/home.tsx';

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
            <Route element={<AuthenticatedLayout />}>
              <Route path="home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
    <Toaster richColors position="top-center" closeButton />
  </StrictMode>
);
