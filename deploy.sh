#!/bin/bash

echo "🚀 Deploying your portfolio website..."

# Build the project
echo "📦 Building the project..."
npm run build

echo "✅ Build complete!"
echo ""
echo "🌐 Your website is ready to deploy!"
echo ""
echo "Choose your deployment method:"
echo "1. Vercel (Recommended):"
echo "   - Go to vercel.com and sign up"
echo "   - Run: vercel"
echo ""
echo "2. Netlify:"
echo "   - Go to netlify.com and sign up"
echo "   - Drag and drop the 'out' folder"
echo ""
echo "3. GitHub Pages:"
echo "   - Push to GitHub"
echo "   - Enable GitHub Pages in repository settings"
echo ""
echo "4. Any static hosting service:"
echo "   - Upload the contents of the 'out' folder" 