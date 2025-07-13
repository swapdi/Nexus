// Run the TypeScript populate script using ts-node
const { exec } = require('child_process');
const path = require('path');
// Path to the TypeScript script
const scriptPath = path.join(__dirname, 'populate-games-with-service.ts');
// Execute the TypeScript script
exec(`npx ts-node ${scriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error executing script:', error);
    return;
  }
  if (stderr) {
    console.error('⚠️ Stderr:', stderr);
  }
});
