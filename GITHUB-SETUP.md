# 🚀 Guide GitHub → Vercel

## 📋 Étapes Précises

### 1️⃣ Créer le Repository GitHub

1. Aller sur [github.com](https://github.com)
2. Cliquer **"New repository"**
3. Nom : `ag-avocats`
4. Description : `Site web professionnel pour le cabinet AG AVOCATS`
5. **Public** (recommandé pour Vercel gratuit)
6. ✅ **NE PAS** cocher "Add README" (on en a déjà un)
7. Cliquer **"Create repository"**

### 2️⃣ Commands Git (Copier-Coller)

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "🚀 Initial commit - AG AVOCATS website with blog and chatbot"

# Renommer la branche
git branch -M main

# Ajouter l'origine (REMPLACER YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/ag-avocats.git

# Push vers GitHub
git push -u origin main
```

### 3️⃣ Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. **"Sign up"** avec GitHub
3. Cliquer **"New Project"**
4. Chercher `ag-avocats` dans la liste
5. Cliquer **"Import"**
6. Laisser la configuration par défaut :
   - Framework Preset : `Other`
   - Root Directory : `./`
   - Build Command : (vide)
   - Output Directory : (vide)
   - Install Command : `npm install`
7. Cliquer **"Deploy"**

### 4️⃣ Configuration Vercel (Optionnel)

Si besoin, ajouter ces variables d'environnement :
- `NODE_ENV` = `production`
- `PORT` = `5000`

## ✅ Fichiers Préparés

- ✅ `.gitignore` - Ignore les fichiers sensibles
- ✅ `README.md` - Documentation complète
- ✅ `vercel.json` - Configuration Vercel
- ✅ `server.js` - Serveur Express optimisé
- ✅ Tous les fichiers HTML/CSS/JS

## 🎯 Résultat Final

Votre site sera disponible sur :
- `https://ag-avocats.vercel.app`
- Et éventuellement un domaine custom si configuré

## 🆘 En Cas de Problème

1. **Repository privé** : Passer en public ou upgrade Vercel
2. **Build error** : Vercel auto-détecte Node.js normalement
3. **Port error** : Vercel gère automatiquement les ports

**Temps total estimé : 5-10 minutes**