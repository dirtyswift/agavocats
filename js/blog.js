// Blog functionality
class BlogManager {
    constructor() {
        this.apiUrl = 'https://api.sheetbest.com/sheets/1c93c00e-d99a-46b9-a319-018cb4307ead';
        this.articles = [];
        this.categories = new Set();
        this.init();
    }

    async init() {
        try {
            await this.loadArticles();
            this.renderArticles();
            this.renderSidebar();
        } catch (error) {
            this.showError();
            console.error('Erreur lors du chargement du blog:', error);
        }
    }

    async loadArticles() {
        const loadingEl = document.getElementById('loading');
        const articlesContainer = document.getElementById('articles-container');
        
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Filter and process articles
            this.articles = data
                .filter(article => article.Titre && article.Slug) // Only articles with title and slug
                .map(article => ({
                    titre: article.Titre,
                    slug: article.Slug,
                    resume: article.Résumé || '',
                    categorie: article.Catégorie || 'Non classé',
                    datePublication: article['Date de publication'] || '',
                    auteur: article.Auteur || 'AG AVOCATS',
                    contenu: article['Contenu complet'] || '',
                    imageUrl: article['Image URL'] || '',
                    date: new Date(article['Date de publication'] || Date.now())
                }))
                .sort((a, b) => b.date - a.date); // Sort by date, newest first

            // Extract categories
            this.articles.forEach(article => {
                if (article.categorie) {
                    this.categories.add(article.categorie);
                }
            });

            loadingEl.style.display = 'none';
            articlesContainer.style.display = 'block';
            
        } catch (error) {
            loadingEl.style.display = 'none';
            throw error;
        }
    }

    renderArticles() {
        const container = document.getElementById('articles-container');
        
        if (this.articles.length === 0) {
            container.innerHTML = '<p class="no-articles">Aucun article disponible pour le moment.</p>';
            return;
        }

        const articlesHtml = this.articles.map(article => this.createArticleCard(article)).join('');
        container.innerHTML = articlesHtml;
    }

    createArticleCard(article) {
        const formattedDate = this.formatDate(article.date);
        const imageHtml = article.imageUrl 
            ? `<img src="${article.imageUrl}" alt="${article.titre}" class="article-image" loading="lazy">`
            : `<div class="article-image" style="background-color: var(--bg-light); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">Image non disponible</div>`;

        return `
            <article class="article-card">
                ${imageHtml}
                <div class="article-content">
                    <div class="article-meta">
                        <span class="article-category">${article.categorie}</span>
                        <span class="article-date">${formattedDate}</span>
                    </div>
                    <h2 class="article-title">
                        <a href="article.html?slug=${article.slug}">${article.titre}</a>
                    </h2>
                    <p class="article-summary">${article.resume}</p>
                    <div class="article-footer">
                        <span class="article-author">Par ${article.auteur}</span>
                        <a href="article.html?slug=${article.slug}" class="read-more-btn">Lire la suite</a>
                    </div>
                </div>
            </article>
        `;
    }

    renderSidebar() {
        this.renderCategories();
        this.renderRecentArticles();
    }

    renderCategories() {
        const categoriesContainer = document.getElementById('categories-list');
        
        const categoriesHtml = Array.from(this.categories)
            .sort()
            .map(category => `
                <li><a href="#" onclick="blogManager.filterByCategory('${category}')">${category}</a></li>
            `).join('');

        categoriesContainer.innerHTML = `
            <li><a href="#" onclick="blogManager.showAllArticles()">Tous les articles</a></li>
            ${categoriesHtml}
        `;
    }

    renderRecentArticles() {
        const recentContainer = document.getElementById('recent-articles');
        const recentArticles = this.articles.slice(0, 5); // Show 5 most recent

        const recentHtml = recentArticles.map(article => {
            const formattedDate = this.formatDate(article.date);
            const imageHtml = article.imageUrl 
                ? `<img src="${article.imageUrl}" alt="${article.titre}" class="recent-article-image" loading="lazy">`
                : `<div class="recent-article-image" style="background-color: var(--bg-light);"></div>`;

            return `
                <div class="recent-article">
                    ${imageHtml}
                    <div class="recent-article-content">
                        <h4 class="recent-article-title">
                            <a href="article.html?slug=${article.slug}">${article.titre}</a>
                        </h4>
                        <span class="recent-article-date">${formattedDate}</span>
                    </div>
                </div>
            `;
        }).join('');

        recentContainer.innerHTML = recentHtml;
    }

    filterByCategory(category) {
        const filteredArticles = this.articles.filter(article => article.categorie === category);
        this.renderFilteredArticles(filteredArticles);
        
        // Update page title
        document.querySelector('.blog-hero h1').textContent = `Blog - ${category}`;
    }

    showAllArticles() {
        this.renderArticles();
        document.querySelector('.blog-hero h1').textContent = 'Blog juridique';
    }

    renderFilteredArticles(articles) {
        const container = document.getElementById('articles-container');
        
        if (articles.length === 0) {
            container.innerHTML = '<p class="no-articles">Aucun article trouvé dans cette catégorie.</p>';
            return;
        }

        const articlesHtml = articles.map(article => this.createArticleCard(article)).join('');
        container.innerHTML = articlesHtml;
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    showError() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error-message').style.display = 'block';
    }

    // Get article by slug for article page
    getArticleBySlug(slug) {
        return this.articles.find(article => article.slug === slug);
    }
}

// Single Article Page Manager
class ArticleManager {
    constructor() {
        this.apiUrl = 'https://api.sheetbest.com/sheets/1c93c00e-d99a-46b9-a319-018cb4307ead';
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        
        if (!slug) {
            this.showError('Article non trouvé');
            return;
        }

        try {
            await this.loadAndRenderArticle(slug);
        } catch (error) {
            this.showError('Erreur lors du chargement de l\'article');
            console.error('Erreur article:', error);
        }
    }

    async loadAndRenderArticle(slug) {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const articleData = data.find(item => item.Slug === slug);
            
            if (!articleData) {
                throw new Error('Article non trouvé');
            }

            const article = {
                titre: articleData.Titre,
                slug: articleData.Slug,
                resume: articleData.Résumé || '',
                categorie: articleData.Catégorie || 'Non classé',
                datePublication: articleData['Date de publication'] || '',
                auteur: articleData.Auteur || 'AG AVOCATS',
                contenu: articleData['Contenu complet'] || '',
                imageUrl: articleData['Image URL'] || '',
                date: new Date(articleData['Date de publication'] || Date.now())
            };

            this.renderArticle(article);
            this.updateSEO(article);
            
        } catch (error) {
            throw error;
        }
    }

    renderArticle(article) {
        const formattedDate = this.formatDate(article.date);
        
        // Update page content
        document.querySelector('.article-page-title').textContent = article.titre;
        
        const metaContainer = document.querySelector('.article-page-meta');
        metaContainer.innerHTML = `
            <span class="article-category">${article.categorie}</span>
            <span class="article-date">${formattedDate}</span>
            <span class="article-author">Par ${article.auteur}</span>
        `;

        // Update image
        const imageContainer = document.querySelector('.article-page-image');
        if (article.imageUrl) {
            imageContainer.src = article.imageUrl;
            imageContainer.alt = article.titre;
            imageContainer.style.display = 'block';
        } else {
            imageContainer.style.display = 'none';
        }

        // Update content
        const contentContainer = document.querySelector('.article-body');
        contentContainer.innerHTML = this.formatContent(article.contenu);
    }

    formatContent(content) {
        if (!content) {
            return '<p>Contenu non disponible.</p>';
        }

        // Simple formatting - convert line breaks to paragraphs
        return content
            .split('\n\n')
            .filter(paragraph => paragraph.trim())
            .map(paragraph => `<p>${paragraph.trim()}</p>`)
            .join('');
    }

    updateSEO(article) {
        // Update page title
        document.title = `${article.titre} - AG AVOCATS`;
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', article.resume || `${article.titre} - Article du blog juridique AG AVOCATS`);

        // Update Open Graph tags
        this.updateOGTag('og:title', article.titre);
        this.updateOGTag('og:description', article.resume || article.titre);
        this.updateOGTag('og:url', `https://www.cabinetag.com/article.html?slug=${article.slug}`);
        if (article.imageUrl) {
            this.updateOGTag('og:image', article.imageUrl);
        }
    }

    updateOGTag(property, content) {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    showError(message) {
        document.querySelector('.article-container').innerHTML = `
            <div class="error-message">
                <h2>Erreur</h2>
                <p>${message}</p>
                <a href="blog.html" class="back-to-blog">← Retour au blog</a>
            </div>
        `;
    }
}

// Initialize based on page
let blogManager;
let articleManager;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('articles-container')) {
        // Blog listing page
        blogManager = new BlogManager();
    } else if (document.querySelector('.article-page')) {
        // Single article page
        articleManager = new ArticleManager();
    }
});