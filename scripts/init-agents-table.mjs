import { neon } from '@neondatabase/serverless';

async function createTable() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.includes('placeholder')) {
    console.log('No valid DATABASE_URL found. Skipping table creation.');
    return;
  }
  
  const sql = neon(dbUrl);
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS agents (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'Support',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Agents table created successfully (if it did not exist).');
  } catch (error) {
    console.error('Failed to create table:', error);
  }
}

createTable();
