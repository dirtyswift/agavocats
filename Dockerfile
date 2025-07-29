# Utilise une image Nginx légère
FROM nginx:alpine

# Copie le fichier HTML dans le répertoire de Nginx
COPY iframe-wrapper.html /usr/share/nginx/html/index.html

# Copie la configuration Nginx personnalisée (optionnel)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose le port 80
EXPOSE 80

# Labels pour la documentation
LABEL maintainer="AG AVOCATS"
LABEL description="Wrapper iframe pour le site AG AVOCATS"
LABEL version="1.0"

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]