'use strict';

// CommonJS bridge for cPanel Passenger.
import('./index.mjs').catch((error) => {
  console.error('Failed to start WellWork:', error);
  process.exitCode = 1;
});
