# 🔐 Résoudre le Problème d'Authentification Git

## ❌ Erreur Rencontrée
```
remote: Invalid username or token. Password authentication is not supported for Git operations.
```

## 🔧 Solutions (Choisir l'une d'entre elles)

### **Option 1: Personal Access Token (Recommandé)**

1. **Créer un Personal Access Token**
   - Aller sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Cliquer "Generate new token (classic)"
   - Nom: `AG-AVOCATS-deployment`
   - Scopes: Cocher `repo` (accès complet aux repositories)
   - Cliquer "Generate token"
   - **COPIER LE TOKEN** (il ne s'affichera qu'une fois)

2. **Utiliser le token comme mot de passe**
   ```bash
   git remote set-url origin https://YOUR-USERNAME:YOUR-TOKEN@github.com/YOUR-USERNAME/ag-avocats.git
   git push -u origin main
   ```

### **Option 2: GitHub CLI (Plus Simple)**

1. **Installer GitHub CLI**
   ```bash
   # Si pas installé
   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
   sudo apt update
   sudo apt install gh
   ```

2. **S'authentifier et créer le repo**
   ```bash
   gh auth login
   gh repo create ag-avocats --public --source=. --remote=origin --push
   ```

### **Option 3: SSH (Avancé)**

1. **Générer une clé SSH**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
   cat ~/.ssh/id_rsa.pub
   ```

2. **Ajouter la clé sur GitHub**
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - Coller le contenu de `id_rsa.pub`

3. **Changer l'URL remote**
   ```bash
   git remote set-url origin git@github.com:YOUR-USERNAME/ag-avocats.git
   git push -u origin main
   ```

## 🎯 Après Résolution

Une fois l'authentification résolue :
1. Le push vers GitHub fonctionnera
2. Aller sur vercel.com
3. Importer le repository `ag-avocats`
4. Deploy automatique

## 💡 Note Importante

L'authentification par mot de passe GitHub est désactivée depuis 2021 pour des raisons de sécurité. Il faut obligatoirement utiliser un token ou SSH.