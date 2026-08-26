const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('./config/db');
const { seedDefaultData } = require('./utils/seeder');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const offerRoutes = require('./routes/offerRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const settingRoutes = require('./routes/settingRoutes');

const app = express();

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    brand: 'Country Holidays Hotels & Resorts',
    system: 'Executive Concierge REST API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes Mounting (v1 & legacy aliases)
app.use('/api/v1/auth', authRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.use('/api/v1/accommodations', accommodationRoutes);
app.use('/api/accommodations', accommodationRoutes);

app.use('/api/v1/offers', offerRoutes);
app.use('/api/offers', offerRoutes);

app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/gallery', galleryRoutes);

app.use('/api/v1/settings', settingRoutes);
app.use('/api/settings', settingRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server and Connect Database
const startServer = async () => {
  const conn = await connectDB();
  if (conn) {
    await seedDefaultData();
  }

  app.listen(PORT, () => {
    console.log(`\n\x1b[35m====================================================\x1b[0m`);
    console.log(`\x1b[36m  COUNTRY HOLIDAYS HOTELS & RESORTS - BACKEND API\x1b[0m`);
    console.log(`\x1b[32m  ✔ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}\x1b[0m`);
    console.log(`\x1b[33m  ✔ Base URL: http://localhost:${PORT}/api/v1\x1b[0m`);
    console.log(`\x1b[35m====================================================\x1b[0m\n`);
  });
};

startServer();

module.exports = app;
