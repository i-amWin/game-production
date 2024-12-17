import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import express from 'express';

import { errorMiddleware } from '@/app/middlewares/error.middleware';
import { notFoundMiddleware } from '@/app/middlewares/not-found.middleware';
import authRouter from '@/app/routes/auth.routes';
import bannerRouter from '@/app/routes/banners.routes';
import settingsRouter from '@/app/routes/settings.routes';
import usersRouter from '@/app/routes/users.routes';

const app = express();

// Middleware setup
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());

// Routes
app.use('/users', usersRouter);

app.use('/auth', authRouter);

app.use('/banners', bannerRouter);

app.use('/settings', settingsRouter);

// Health check endpoint
app.get('/health-check', (_, res) => {
  res.send('Server is running');
});

// Error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
