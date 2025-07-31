#!/bin/bash
# Deployment script for AG AVOCATS website

echo "🚀 Deploying AG AVOCATS website..."

# Check if server is running
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Server is running and healthy"
else
    echo "❌ Server is not responding"
    exit 1
fi

# Check required files
if [ -f "server.js" ] && [ -f "package.json" ] && [ -f "replit.toml" ]; then
    echo "✅ All deployment files present"
else
    echo "❌ Missing deployment files"
    exit 1
fi

echo "📋 Deployment Configuration:"
echo "- Target: autoscale"
echo "- Port: 5000"
echo "- Host: 0.0.0.0"
echo "- Node.js: $(node --version)"
echo "- Express: $(npm list express --depth=0 | grep express)"

echo "✅ Ready for deployment via Replit interface"
echo "Please click the Deploy button in the Replit interface"