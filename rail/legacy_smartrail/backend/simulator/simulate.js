// backend/simulator/simulate.js
// Standalone CLI runner to test GPS simulation from terminal

const simulator = require('./trainSimulator');

const trainNumber = process.argv[2] || '12723';
const intervalMs = parseInt(process.argv[3], 10) || 2500;

console.log('====================================================');
console.log('🚄 SmartRail India — Standalone GPS Route Simulator');
console.log(`📡 Simulating Train: ${trainNumber} every ${intervalMs}ms`);
console.log('Press Ctrl+C to terminate simulation.');
console.log('====================================================');

simulator.startSimulation(trainNumber, intervalMs, 0.03);

process.on('SIGINT', () => {
  simulator.stopSimulation(trainNumber);
  console.log('\nSimulation stopped. Exiting.');
  process.exit(0);
});
