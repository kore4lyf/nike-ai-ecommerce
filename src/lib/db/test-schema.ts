import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This is a simple test file to verify the schema works correctly
// In a real application, you would use proper testing frameworks

async function testSchema() {
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not set, skipping test');
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql, { schema });
    
    console.log('Schema test completed successfully!');
    console.log('Available tables:', Object.keys(schema));
    
    // Test a simple query (uncomment when you have data)
    // const result = await db.select().from(schema.products).limit(1);
    // console.log('Sample product:', result);
    
  } catch (error) {
    console.error('Schema test failed:', error);
  }
}

testSchema();