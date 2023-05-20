/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/public/**',
    '!**/dist/**',
  ],
};

export default config;
