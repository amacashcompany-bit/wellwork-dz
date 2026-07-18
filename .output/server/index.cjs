'use strict';

import('./index.mjs').catch((error) => {
  console.error('Failed to start WellWork:', error);
  process.exitCode = 1;
});
