# 📁 Upload GitHub avec Structure de Dossiers

## ❌ Problème Identifié
L'interface web GitHub n'upload que les fichiers, pas les dossiers.

## ✅ Solutions

### **Solution 1: Upload par Dossier (Recommandé)**

1. **Créer le repository** `ag-avocats` (vide, sans README)

2. **Upload ROOT files** (première fois):
   - Sélectionner tous les fichiers .html, .json, .md, etc. de la racine
   - Commit: "Add root files"

3. **Créer dossier CSS**:
   - "Create new file" 
   - Nom: `css/style.css`
   - Copier le contenu de votre style.css
   - Commit: "Add CSS files"

4. **Ajouter blog.css**:
   - "Add file" → "Create new file"
   - Nom: `css/blog.css` 
   - Copier le contenu
   - Commit: "Add blog CSS"

5. **Créer dossier JS**:
   - "Create new file"
   - Nom: `js/script.js`
   - Copier le contenu
   - Commit: "Add JS files"

6. **Répéter pour**:
   - `js/common.js`
   - `js/blog.js`

### **Solution 2: Git Command Line (Si possible)**

```bash
# Créer repository local
git init
git add .
git commit -m "Initial commit"

# Ajouter remote avec votre Personal Access Token
git remote add origin https://USERNAME:TOKEN@github.com/USERNAME/ag-avocats.git
git push -u origin main
```

### **Solution 3: GitHub Desktop (Plus Simple)**

1. Télécharger GitHub Desktop
2. File → Add Local Repository → Sélectionner dossier extrait
3. Publish repository → ag-avocats
4. Structure préservée automatiquement

## 🎯 Après Upload

Une fois la structure complète sur GitHub:
1. Vercel → Import project → ag-avocats
2. Deploy automatique
3. Site en ligne !

**Le plus important**: Avoir tous les fichiers avec la bonne structure avant de déployer sur Vercel.