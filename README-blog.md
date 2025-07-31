# Blog AG AVOCATS - Configuration Google Sheets

Ce blog dynamique récupère ses articles depuis une Google Sheet via l'API Sheet.best.

## Configuration actuelle

- **URL API** : `https://api.sheetbest.com/sheets/1c93c00e-d99a-46b9-a319-018cb4307ead`
- **Service utilisé** : [Sheet.best](https://sheet.best) (convertisseur Google Sheets → JSON API)

## Structure de la Google Sheet

La Google Sheet doit contenir les colonnes suivantes (en en-têtes) :

| Colonne | Description | Requis | Exemple |
|---------|-------------|---------|---------|
| `Titre` | Titre de l'article | ✅ | "Les nouvelles réglementations des baux commerciaux" |
| `Slug` | URL-friendly identifier | ✅ | "nouvelles-reglementations-baux-commerciaux" |
| `Résumé` | Description courte pour la liste | ❌ | "Découvrez les changements récents dans la législation..." |
| `Catégorie` | Catégorie de l'article | ❌ | "Baux commerciaux" |
| `Date de publication` | Date au format ISO | ❌ | "2025-01-15" |
| `Auteur` | Nom de l'auteur | ❌ | "Maître Abou" |
| `Contenu complet` | Contenu de l'article en texte | ❌ | "Le nouveau décret modifie..." |
| `Image URL` | URL de l'image d'illustration | ❌ | "https://example.com/image.jpg" |

## Fonctionnalités du blog

### Page de liste (`blog.html`)
- ✅ Affichage des articles par ordre chronologique (plus récents en premier)
- ✅ Filtrage par catégorie
- ✅ Sidebar avec catégories et articles récents
- ✅ Design responsive
- ✅ Gestion des erreurs de chargement

### Page d'article (`article.html`)
- ✅ Affichage du contenu complet
- ✅ Optimisation SEO automatique (title, meta description, Open Graph)
- ✅ URL avec slug : `/article.html?slug=mon-article`
- ✅ Retour vers la liste du blog

### Optimisations techniques
- ✅ Chargement asynchrone via `fetch()`
- ✅ Gestion des états de chargement et d'erreur
- ✅ Lazy loading des images
- ✅ Responsive design
- ✅ SEO-friendly (balises sémantiques, meta tags)

## Comment modifier l'API source

### Option 1 : Garder Sheet.best (recommandé)
1. Remplacer l'URL dans `js/blog.js` ligne 4 :
   ```javascript
   this.apiUrl = 'https://api.sheetbest.com/sheets/VOTRE-ID-SHEET-BEST';
   ```

### Option 2 : Utiliser Google Sheets API directement
1. Activer l'API Google Sheets
2. Créer une clé API
3. Modifier `js/blog.js` pour utiliser l'API Google :
   ```javascript
   this.apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/Sheet1?key=API_KEY';
   ```

### Option 3 : Utiliser Google Apps Script
1. Créer un script Apps Script qui retourne du JSON
2. Publier comme webapp
3. Utiliser l'URL du webapp

## Ajout d'articles

Pour ajouter un nouvel article :
1. Ouvrir la Google Sheet
2. Ajouter une nouvelle ligne avec toutes les colonnes remplies
3. S'assurer que le `Slug` est unique et URL-friendly
4. Le blog se mettra à jour automatiquement

## Exemples de slugs
- ✅ Bon : `nouveau-decret-baux-commerciaux-2025`
- ✅ Bon : `contentieux-commercial-tendances`
- ❌ Éviter : `Nouveau décret sur les baux commerciaux !`
- ❌ Éviter : `article-1` (pas descriptif)

## Gestion des images
- Héberger les images sur un service comme Imgur, CloudinaryCloud, ou votre propre serveur
- Utiliser des URLs complètes dans la colonne `Image URL`
- Formats recommandés : JPG, PNG, WebP
- Taille recommandée : 800x400px

## SEO et référencement
- Chaque article génère automatiquement ses meta tags
- Le sitemap peut être mis à jour manuellement dans `sitemap.xml`
- Les URLs d'articles suivent le pattern : `/article.html?slug=mon-slug`

## Dépannage

### Aucun article ne s'affiche
1. Vérifier que l'URL API est correcte
2. Vérifier que la Google Sheet est publique
3. Ouvrir la console développeur pour voir les erreurs

### Un article spécifique ne s'affiche pas
1. Vérifier que les colonnes `Titre` et `Slug` sont remplies
2. Vérifier que le slug ne contient pas de caractères spéciaux
3. Vérifier que la date est au bon format

### Images qui ne s'affichent pas
1. Vérifier que l'URL de l'image est accessible publiquement
2. Vérifier le format de l'image
3. Tester l'URL dans un nouvel onglet

## Support technique
Pour toute question technique, contacter le développeur ou consulter la documentation de Sheet.best.