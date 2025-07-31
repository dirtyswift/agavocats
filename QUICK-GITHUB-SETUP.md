# 🚀 Setup GitHub Rapide (SSH Keys Existantes)

## 🔍 Situation Actuelle
- Vous avez des clés SSH configurées sur votre compte GitHub
- Environnement Replit n'a pas accès à vos clés SSH locales
- Solution : Upload direct ou token temporaire

## ⚡ Solutions Rapides

### **Option 1: Upload Direct (2 minutes)**

1. **Télécharger le projet** :
   - Menu Replit → "Download as ZIP"
   - OU copier tous les fichiers

2. **Créer repo GitHub** :
   - GitHub.com → New repository → `ag-avocats`
   - Public, sans README

3. **Upload files** :
   - "uploading an existing file"
   - Drag & drop tous les fichiers
   - Commit: "Initial commit - AG AVOCATS website"

### **Option 2: Token Temporaire (1 minute)**

1. **GitHub Token** :
   - GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Scope: `repo`
   - Copier le token

2. **Git commands** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AG AVOCATS website" 
   git branch -M main
   git remote add origin https://YOUR-USERNAME:YOUR-TOKEN@github.com/YOUR-USERNAME/ag-avocats.git
   git push -u origin main
   ```

### **Option 3: GitHub CLI (Si disponible)**
   ```bash
   gh auth login --with-token
   # Coller votre token
   gh repo create ag-avocats --public --source=. --remote=origin --push
   ```

## 🎯 Après GitHub

1. Aller sur vercel.com
2. Se connecter avec GitHub
3. Import project → ag-avocats
4. Deploy

**Temps total : 5 minutes maximum**