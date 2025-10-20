const Database = require('better-sqlite3');
const fs = require('fs');

// Remove existing database
try {
  fs.unlinkSync('sqlite.db');
} catch (e) {
  // File doesn't exist, that's fine
}

const db = new Database('sqlite.db');

// Create products table with new schema
db.exec(`
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    image_url TEXT,
    category TEXT,
    brand TEXT,
    badge TEXT,
    badge_type TEXT,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  )
`);

// Insert sample data
const insert = db.prepare(`
  INSERT INTO products (name, description, price, image_url, category, brand, badge, badge_type)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const products = [
  ['Air Force 1 Mid \'07', 'Iconic comfort with extra heel cushioning', '98.30', '/hero-shoe.png', 'Men\'s Shoes', 'Nike', 'Best Seller', 'bestseller'],
  ['Court Vision Low Next Nature', 'Classic style that speaks for itself', '98.30', '/trending-1.png', 'Men\'s Shoes', 'Nike', 'Extra 20% off', 'discount'],
  ['Air Force 1 PLTAFORM', 'Retro style with modern comfort', '98.30', '/trending-2.png', 'Men\'s Shoes', 'Nike', 'Sustainable Materials', 'sustainable'],
  ['Dunk Low', 'Heritage hoops style with premium materials', '120.00', '/trending-3.png', 'Men\'s Shoes', 'Nike', null, null]
];

products.forEach(product => {
  insert.run(...product);
});

console.log('Database recreated and seeded successfully!');
db.close();
