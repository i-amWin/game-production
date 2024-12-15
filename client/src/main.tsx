/* eslint-disable react-refresh/only-export-components */
import { Toaster } from 'sonner';

import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { AuthenticatedLayout } from '@/layouts/authenticated-layout.tsx';
import { GuestLayout } from '@/layouts/guest-layout.tsx';

import { CONSTANTS } from './constants.ts';
import './index.css';

const queryClient = new QueryClient();

const App = lazy(() => import('./App.tsx'));
const Login = lazy(() => import('./pages/auth/login.tsx'));
const Register = lazy(() => import('./pages/auth/register.tsx'));

const Home = lazy(() => import('./pages/user/home.tsx'));
const Activity = lazy(() => import('./pages/user/activity.tsx'));
const Promotion = lazy(() => import('./pages/user/promotion.tsx'));
const Wallet = lazy(() => import('./pages/user/wallet.tsx'));
const Profile = lazy(() => import('./pages/user/profile.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Helmet>
            <title>{CONSTANTS.APP_NAME}</title>
          </Helmet>

          <Suspense fallback="Loading...">
            <Routes>
              {/* Index Route */}
              <Route path="/" element={<App />} />

              {/* Auth Routes */}
              <Route element={<GuestLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Authenticated Routes (User) */}
              <Route element={<AuthenticatedLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="activity" element={<Activity />} />
                <Route path="promotion" element={<Promotion />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
    <Toaster richColors position="top-center" closeButton />
  </StrictMode>
);
