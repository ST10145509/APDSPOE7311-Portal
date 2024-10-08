const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');
const userRoutes = require('./routes/user.routes');
const apiRoutes = require('./routes/api.routes'); // Add this line
const accountRoutes = require('./routes/account.routes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { verifyToken: verifyTokenMiddleware } = require('./middleware/auth.middleware');
const { verifyToken: verifyTokenController } = require('./controllers/auth.controller');
require('dotenv').config();
// Log the MongoDB URI to verify it's loaded
console.log('MongoDB URI:', process.env.MONGODB_URI);

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'https://localhost:4200', // Correct HTTPS URL for your Angular app
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(helmet());

// Routes
app.use('/auth', userRoutes);

// Protected routes
app.use('/api', verifyTokenMiddleware, apiRoutes);
app.use('/api', verifyTokenMiddleware, accountRoutes);

// Add your protected routes here, for example:
// app.use('/api/protected-route', protectedRouteHandler);

// Rate Limiting to prevent brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
console.log('MongoDB URI:', mongoUri); // This should now print your actual URI

mongoose.connect(mongoUri)
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// SSL setup
const options = {
  key: fs.readFileSync('ssl/privatekey.pem'),
  cert: fs.readFileSync('ssl/certificate.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('Server running on https://localhost:443');
});
