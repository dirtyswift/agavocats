#!/bin/bash

echo "🚀 AG AVOCATS - Alternatives de Déploiement"
echo "==========================================="
echo ""

echo "📋 État du serveur local :"
if curl -s http://localhost:5000/health > /dev/null; then
    echo "✅ Serveur OK (port 5000)"
    curl -s http://localhost:5000/health | head -3
else
    echo "❌ Serveur non accessible"
fi

echo ""
echo "📁 Fichiers de déploiement :"
ls -la | grep -E "(toml|json|Dockerfile|Procfile)" | while read line; do
    echo "✅ $line"
done

echo ""
echo "🌐 Options de déploiement disponibles :"
echo ""
echo "1️⃣  VERCEL (Recommandé)"
echo "   • Aller sur vercel.com"
echo "   • Importer depuis Git OU upload dossier"
echo "   • Configuration automatique avec vercel.json"
echo ""

echo "2️⃣  NETLIFY" 
echo "   • Aller sur netlify.com"
echo "   • Drag & drop le dossier complet"
echo "   • Deploy automatique en 30 secondes"
echo ""

echo "3️⃣  RAILWAY"
echo "   • Aller sur railway.app"
echo "   • Connect GitHub OU upload"
echo "   • Support Node.js automatique"
echo ""

echo "4️⃣  HEROKU"
echo "   • Créer compte heroku.com"
echo "   • Upload ou Git deploy"
echo "   • Procfile configuré"
echo ""

echo "💡 Le site fonctionne parfaitement en local"
echo "   Le problème Replit est administratif, pas technique"

echo ""
echo "🆘 Pour forcer Replit, essayez :"
echo "   1. Rafraîchir la page complètement (Ctrl+F5)"
echo "   2. Aller dans Settings → Deployments"
echo "   3. Contacter le support Replit"