require('dotenv').config();

// Run the JavaScript populate script
console.log('🚀 Starting IGDB database population...');
require('./populate-games-with-service.js');
