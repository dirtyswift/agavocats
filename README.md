# AG AVOCATS - Wrapper iframe

Ce projet contient un wrapper iframe pour intégrer le site AG AVOCATS dans un container Docker avec Traefik.

## Structure du projet

```
.
├── iframe-wrapper.html     # Page HTML principale avec iframe
├── Dockerfile             # Configuration Docker
├── nginx.conf             # Configuration Nginx
├── docker-compose.yml     # Configuration Docker Compose avec Traefik
└── README.md              # Documentation
```

## Fonctionnalités

- **Iframe sécurisé** : Intégration du site AG AVOCATS avec sandbox approprié
- **Écran de chargement** : Interface de chargement avec le branding AG AVOCATS
- **Gestion d'erreurs** : Écran d'erreur avec possibilité de réessayer
- **Responsive** : Adapté à tous les écrans (desktop, tablet, mobile)
- **SEO optimisé** : Meta tags et structure HTML optimisés
- **Sécurité** : Headers de sécurité et configuration Nginx sécurisée
- **Monitoring** : Health check endpoint pour Traefik
- **Performance** : Gzip, cache control, optimisations Nginx

## Déploiement avec Docker et Traefik

### Prérequis

- Docker et Docker Compose installés
- Traefik configuré avec le réseau `traefik`
- Nom de domaine pointant vers votre serveur

### Configuration

1. **Modifier le domaine** dans `docker-compose.yml` :
   ```yaml
   - "traefik.http.routers.ag-avocats.rule=Host(`votre-domaine.com`)"
   ```

2. **Modifier l'URL du site** dans `iframe-wrapper.html` si nécessaire :
   ```javascript
   const IFRAME_URL = 'https://ag-avocats-site-dirtyswift.replit.app';
   ```

### Déploiement

```bash
# Cloner ou copier les fichiers sur votre VPS
git clone <votre-repo> ag-avocats-wrapper
cd ag-avocats-wrapper

# Construire et démarrer le container
docker-compose up -d

# Vérifier les logs
docker-compose logs -f

# Vérifier le statut
docker-compose ps
```

### Commandes utiles

```bash
# Reconstruire après modifications
docker-compose up -d --build

# Redémarrer le service
docker-compose restart

# Arrêter le service
docker-compose down

# Voir les logs Nginx
docker-compose logs ag-avocats-wrapper

# Accéder au container
docker-compose exec ag-avocats-wrapper sh
```

## Configuration Traefik

Le fichier `docker-compose.yml` inclut toute la configuration Traefik nécessaire :

- **SSL automatique** avec Let's Encrypt
- **Redirection HTTP vers HTTPS**
- **Redirection www vers non-www**
- **Health checks**
- **Load balancing** (si plusieurs instances)

## Monitoring et logs

- **Health check** : `https://votre-domaine.com/health`
- **Logs Nginx** : `docker-compose logs ag-avocats-wrapper`
- **Métriques Traefik** : Via le dashboard Traefik

## Sécurité

- Headers de sécurité configurés dans Nginx
- Iframe avec sandbox approprié
- Déni d'accès aux fichiers sensibles
- Configuration HTTPS forcée

## Performance

- **Gzip** activé pour tous les assets
- **Cache control** optimisé
- **Resource limits** configurés
- **Image Docker Alpine** pour une taille réduite

## Maintenance

### Mise à jour de l'URL du site

Si l'URL du site AG AVOCATS change, modifiez la constante dans `iframe-wrapper.html` :

```javascript
const IFRAME_URL = 'https://nouvelle-url.com';
```

Puis redéployez :

```bash
docker-compose up -d --build
```

### Mise à jour du domaine

Modifiez les labels Traefik dans `docker-compose.yml` et redéployez.

## Dépannage

### Le site ne se charge pas

1. Vérifiez les logs : `docker-compose logs ag-avocats-wrapper`
2. Vérifiez la connectivité : `curl https://ag-avocats-site-dirtyswift.replit.app`
3. Vérifiez les DNS : `nslookup votre-domaine.com`

### Erreur SSL

1. Vérifiez que Traefik a accès à Let's Encrypt
2. Vérifiez que le domaine pointe vers votre serveur
3. Vérifiez les logs Traefik

### Performance lente

1. Vérifiez les ressources du serveur
2. Optimisez les limits dans `docker-compose.yml`
3. Vérifiez la latence réseau vers Replit

## Support

Pour toute question ou problème, contactez l'équipe technique AG AVOCATS.