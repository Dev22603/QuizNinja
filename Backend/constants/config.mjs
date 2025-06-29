import dotenv from 'dotenv';
dotenv.config();

/**
 * @file This module exports a simple configuration object.
 * It reads environment variables once when the module is loaded and caches them.
 * This approach avoids repeatedly accessing process.env, which can be slow in hot code paths.
 *
 * It provides a straightforward way to access configuration but lacks
 * advanced features like validation, type parsing, or strict type safety (without TypeScript).
 */

export const config = {
  // Application Environment
  PORT: process.env.PORT || 5000,          

  // API and Database URLs
  API_URL: process.env.API_URL || 'http://localhost:5000/api',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'Quiz-App',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/Quiz-App',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',

  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'hsfda318heb6834b6vr836v3v318vbn235734nvbyjcmvnbnxbn!', 

  // Cloudinary Credentials
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || '', 
};

