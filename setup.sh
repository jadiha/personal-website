#!/bin/bash

# Install dependencies
npm install

# Check for lint errors (this is what Vercel runs)
echo "\n--- ESLint ---"
npm run lint

# Run full build
echo "\n--- Build ---"
npm run build
