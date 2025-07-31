# 🏛️ AG AVOCATS - Cabinet d'Avocats

## 📋 Description

Site web professionnel pour le cabinet d'avocats AG AVOCATS, spécialisé en droit commercial. Le site propose une interface moderne et responsive avec un système de blog intégré et un chatbot IA pour l'assistance client.

## 🚀 Fonctionnalités

### ✅ Pages Principales
- **Page d'accueil** - Présentation du cabinet et services
- **Services spécialisés** :
  - Baux commerciaux
  - Contentieux commercial  
  - Droit de la franchise
  - Droit des contrats
- **Blog** - Système de blog avec Google Sheets API
- **Contact** - Formulaire de contact avec webhook

### ✅ Fonctionnalités Avancées
- **🤖 Chatbot IA** - Assistant juridique virtuel
- **📱 Design responsive** - Optimisé mobile et desktop
- **🔍 SEO optimisé** - Meta tags, Schema.org, sitemap
- **📊 Tracking des leads** - Identification source des contacts

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla + Alpine.js)
- **Backend** : Node.js + Express.js
- **API** : Google Sheets (via Sheet.best)
- **Déploiement** : Vercel, Netlify, Railway (multi-plateforme)

## 🚀 Déploiement

### GitHub → Vercel (Recommandé)

1. **Push vers GitHub**
```bash
git init
git add .
git commit -m "Initial commit - AG AVOCATS website"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/ag-avocats.git
git push -u origin main
```

2. **Déployer sur Vercel**
- Aller sur [vercel.com](https://vercel.com)
- Se connecter avec GitHub
- Importer le repository `ag-avocats`
- Deploy automatique ✅

### Alternatives

| Plateforme | Configuration | Temps |
|------------|---------------|-------|
| **Netlify** | `netlify.toml` | 30 sec |
| **Railway** | `Dockerfile` | 2 min |
| **Heroku** | `Procfile` | 5 min |

## ⚙️ Installation Locale

```bash
# Cloner le repository
git clone https://github.com/VOTRE-USERNAME/ag-avocats.git
cd ag-avocats

# Installer les dependencies
npm install

# Lancer le serveur de développement
npm start

# Accéder au site
http://localhost:5000
```

## 📊 API Configuration

### Blog (Google Sheets)
- **Endpoint** : `https://api.sheetbest.com/sheets/1c93c00e-d99a-46b9-a319-018cb4307ead`
- **Format** : JSON avec colonnes : titre, contenu, auteur, date, categorie

### Chatbot Webhook
- **Endpoint** : `https://n8n.srv751142.hstgr.cloud/webhook/chatbot-lead`
- **Tracking** : Sources automatiques (formulaire/chatbot)

## 🔍 SEO & Performance

### Optimisations SEO
- ✅ Meta tags complets
- ✅ Schema.org (LegalService, FAQ)
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Open Graph / Twitter Cards

### Performance
- ✅ CSS optimisé avec variables
- ✅ JavaScript modulaire
- ✅ Images optimisées
- ✅ Cache headers configurés

## 📁 Structure du Projet

```
ag-avocats/
├── css/                 # Styles CSS
│   ├── style.css       # Styles principaux
│   └── blog.css        # Styles blog
├── js/                 # Scripts JavaScript
│   ├── script.js       # Fonctions principales
│   ├── common.js       # Utilitaires
│   └── blog.js         # Système blog
├── *.html              # Pages HTML
├── server.js           # Serveur Express
├── package.json        # Dependencies Node.js
└── README.md           # Documentation
```

## 🆘 Support

Pour toute question technique ou commerciale :
- **Email** : contact@cabinetag.com
- **Site** : [AG AVOCATS](https://ag-avocats.vercel.app)

## 📄 Licence

© 2025 AG AVOCATS. Tous droits réservés.

---

**🚀 Prêt pour le déploiement GitHub → Vercel !**