const { execSync } = require('node:child_process');

const command = process.argv.slice(2).join(' ');

if (command) execSync(command, { stdio: 'inherit' });
