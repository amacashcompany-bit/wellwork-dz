'use strict';

// cPanel deployment bundle c756d70.
import('./index.mjs').catch((error) => {
  console.error('Failed to start WellWork:', error);
  process.exitCode = 1;
});
