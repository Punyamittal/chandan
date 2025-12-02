/**
 * PostgreSQL Database Connection
 * Handles database connection pooling and queries
 */

import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const { Pool } = pg;

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Calculate .env file path: db.js is at api/database/db.js, so go up two levels
const envPath = join(__dirname, '..', '..', '.env');

console.log('🔍 db.js: Looking for .env file at:', envPath);
console.log('🔍 db.js: __dirname is:', __dirname);

try {
  if (existsSync(envPath)) {
    console.log('✅ db.js: .env file found!');
    // Try to read as UTF-8 first, but handle UTF-16 if needed
    let envFile = readFileSync(envPath, 'utf-8');
    
    // Check if file is UTF-16 (has null bytes between characters)
    if (envFile.includes('\x00') || envFile.charCodeAt(0) === 0xFEFF) {
      console.log('⚠️ db.js: File appears to be UTF-16, converting to UTF-8...');
      // Read as buffer and convert from UTF-16LE
      const buffer = readFileSync(envPath);
      envFile = buffer.toString('utf16le');
    }
    let loadedCount = 0;
    const loadedVars = [];
    
    // Handle both Windows (\r\n) and Unix (\n) line endings
    const lines = envFile.split(/\r?\n/);
    console.log(`🔍 db.js: Found ${lines.length} lines in .env file`);
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        return;
      }
      
      // Check if line contains an equals sign
      if (trimmed.includes('=')) {
        const equalIndex = trimmed.indexOf('=');
        const key = trimmed.substring(0, equalIndex).trim();
        let value = trimmed.substring(equalIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Remove any trailing whitespace
        value = value.trim();
        
        if (key && value !== undefined) {
          // Always set (override if exists) to ensure latest values
          process.env[key] = value;
          if (key.startsWith('DB_')) {
            loadedCount++;
            loadedVars.push(key);
            console.log(`  ✅ Loaded: ${key} = ${value.substring(0, 10)}... (length: ${value.length})`);
          }
        }
      }
    });
    
    if (loadedCount > 0) {
      console.log(`✅ db.js: Loaded ${loadedCount} DB environment variables:`, loadedVars.join(', '));
      console.log(`✅ db.js: DB_PASSWORD length:`, process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0);
    } else {
      console.warn('⚠️ db.js: No DB_ variables found in .env file');
      console.warn('   Debug: First few lines:', lines.slice(0, 5).map(l => l.trim()).filter(l => l));
    }
  } else {
    console.warn(`⚠️ db.js: .env file not found at: ${envPath}`);
    console.warn(`   Current __dirname: ${__dirname}`);
  }
} catch (error) {
  console.error('❌ db.js: Could not load .env file:', error.message);
  console.error(`   Attempted path: ${envPath}`);
  console.error(`   Error stack:`, error.stack);
}

// Database configuration from environment variables
// Ensure all values are strings and properly trimmed
const dbPassword = (process.env.DB_PASSWORD || '').toString().trim();
const dbHost = (process.env.DB_HOST || 'localhost').toString().trim();
const dbName = (process.env.DB_NAME || 'print_arc_hub').toString().trim();
const dbUser = (process.env.DB_USER || 'postgres').toString().trim();
const dbPort = parseInt(String(process.env.DB_PORT || '5432'), 10);
const isSupabase = dbHost.includes('supabase');

// Validate password is set
if (!dbPassword || dbPassword.length === 0) {
  console.error('❌ ERROR: DB_PASSWORD is not set or empty!');
  console.error('Environment variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD_set: !!process.env.DB_PASSWORD,
    DB_PASSWORD_type: typeof process.env.DB_PASSWORD,
  });
}

const pool = new Pool({
  host: dbHost,
  port: dbPort,
  database: dbName,
  user: dbUser,
  password: dbPassword, // Must be a string
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // Supabase requires SSL
  ssl: isSupabase ? { rejectUnauthorized: false } : false,
});

// Log connection details (without password) for debugging
console.log('Database config:', {
  host: dbHost,
  port: dbPort,
  database: dbName,
  user: dbUser,
  passwordSet: dbPassword.length > 0,
  passwordLength: dbPassword.length,
  passwordType: typeof dbPassword,
  sslEnabled: isSupabase,
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Execute a query
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

/**
 * Get a client from the pool for transactions
 * @returns {Promise<pg.PoolClient>}
 */
export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

/**
 * Test database connection
 * @returns {Promise<boolean>}
 */
export const testConnection = async () => {
  try {
    const result = await query('SELECT NOW()');
    console.log('Database connection test successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};

export default pool;


