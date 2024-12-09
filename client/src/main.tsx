import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';
import './index.css';
import { App } from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { GuestLayout } from './layouts/guest-layout.tsx';
import { Login } from '@/pages/auth/login.tsx';
import { Register } from '@/pages/auth/register.tsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CONSTANTS } from './constants.ts';
import { Dashboard } from './pages/user/dashboard.tsx';
import { AuthenticatedLayout } from './layouts/authenticated-layout.tsx';

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
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
    <Toaster richColors position="top-center" closeButton />
  </StrictMode>
);
