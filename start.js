import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting SkyBlog Application...\n');

// Start backend
const backendProcess = spawn('npm', ['--prefix', 'backend', 'start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Start frontend
const frontendProcess = spawn('npm', ['--prefix', 'frontend', 'start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Handle exit
process.on('SIGINT', () => {
  console.log('\n\n📴 Shutting down servers...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
});

backendProcess.on('error', (err) => {
  console.error('Backend error:', err);
});

frontendProcess.on('error', (err) => {
  console.error('Frontend error:', err);
});
