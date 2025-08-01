# 🔐 SSH Fingerprint vs Personal Access Token

## ❌ Confusion Courante

**SHA256:OJ/XICL0cEKh3IAV+6hb8tbiAaf2LHati1qboFhSPz0** 
👆 Ceci est un **SSH fingerprint** (empreinte), PAS un token

## 🔍 Différences

### SSH Fingerprint (ce que vous avez)
- Commence par `SHA256:`
- Sert à vérifier l'identité du serveur GitHub
- Ne peut PAS être utilisé pour l'authentification Git

### Personal Access Token (ce qu'il faut)
- Commence par `ghp_` ou `github_pat_`
- Long string de 40+ caractères
- Exemple: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- Sert à s'authentifier à la place du mot de passe

## 🔧 Solution : Créer un Personal Access Token

1. **GitHub.com** → Votre avatar → **Settings**
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. **Note**: `AG-AVOCATS-deployment`
5. **Expiration**: 30 days (ou plus)
6. **Scopes**: Cocher ✅ **repo** (Full control of private repositories)
7. **Generate token**
8. **COPIER LE TOKEN** (commence par `ghp_`)

## 🚀 Commands Corrigées

```bash
# Supprimer l'ancien remote (déjà fait)
git remote remove origin

# Ajouter le bon remote avec le token
git remote add origin https://YOUR-USERNAME:ghp_VOTRE-TOKEN@github.com/YOUR-USERNAME/ag-avocats.git

# Push
git push -u origin main
```

**Remplacer**:
- `YOUR-USERNAME` par votre nom d'utilisateur GitHub
- `ghp_VOTRE-TOKEN` par le token que vous venez de créer