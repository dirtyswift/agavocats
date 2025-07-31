# AG AVOCATS - Law Firm Website

## Overview

AG AVOCATS is a professional law firm website specializing in commercial law. The site is built as a static website using HTML, CSS, and JavaScript, focused on providing information about the firm's legal services including commercial leases, commercial litigation, franchise law, and contract law.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This is a static website architecture with the following characteristics:

### Frontend Architecture
- **Static HTML Pages**: Multi-page website with dedicated pages for each practice area
- **CSS Styling**: Custom CSS with CSS variables for theming and responsive design
- **JavaScript Enhancement**: Vanilla JavaScript for interactive elements and Alpine.js for reactive components
- **Responsive Design**: Mobile-first approach with breakpoints for different screen sizes

### Technology Stack
- **HTML5**: Semantic markup with proper SEO optimization
- **CSS3**: Custom styling with CSS variables and modern layout techniques
- **JavaScript**: Vanilla JS for core functionality, Alpine.js for reactive components
- **Fonts**: Google Fonts integration (Libre Baskerville and Open Sans)

## Key Components

### 1. Navigation System
- Responsive navigation with mobile hamburger menu
- Dropdown menus for service categories
- Alpine.js for state management of menu interactions

### 2. SEO Optimization
- Structured data (JSON-LD) for FAQ pages
- Comprehensive meta tags for each page
- Canonical URLs and social media tags
- Robots.txt for search engine crawling guidance

### 3. Page Structure
- **Homepage** (`index.html`): Main landing page
- **Service Pages**: Specialized pages for each legal practice area
  - Commercial leases (`baux-commerciaux.html`)
  - Commercial litigation (`contentieux-commercial.html`)
  - Franchise law (`droit-franchise.html`)
  - Contract law (`droit-contrats.html`)
- **Contact Page** (`contact.html`): Client contact information
- **Legal Pages** (`mentions-legales.html`): Legal disclaimers and terms

### 4. Interactive Elements
- Cookie consent banner
- Mobile navigation toggle
- Dropdown menus
- Form handling (contact forms)
- Smooth scrolling behavior
- AI-powered chatbot with webhook integration
- Chatbot appears on all pages as floating button
- Real-time messaging with typing indicators
- Webhook endpoint: https://n8n.srv751142.hstgr.cloud/webhook/84c6ee00-ab5e-4c23-8b88-a2ee36b84c6f

## Data Flow

### Static Content Flow
1. HTML pages serve as content containers
2. CSS provides styling and layout
3. JavaScript enhances interactivity
4. Alpine.js manages component state
5. No server-side processing required

### User Interaction Flow
1. User navigates between static pages
2. JavaScript handles interactive elements
3. Forms collect user input (contact information)
4. Alpine.js manages dynamic UI states

## External Dependencies

### CDN Dependencies
- **Alpine.js**: Lightweight JavaScript framework for reactive components
- **Google Fonts**: Typography (Libre Baskerville and Open Sans)

### SEO and Analytics
- Structured data markup for search engines
- Meta tags for social media integration
- Robots.txt for search engine optimization

## Deployment Strategy

### Express.js Web Server (Current Implementation)
- Node.js Express server serving static files with proper HTTP response handling
- Multiple health check endpoints for deployment system compatibility:
  - `/health` - Detailed JSON health status
  - `/healthz` - Simple OK response  
  - `/healthcheck` - JSON healthy status
  - `/status` - Service status information
- Graceful shutdown handling for production deployments
- Configured for Replit autoscale deployment with proper host binding (0.0.0.0)

### Alternative Static Hosting
- Can also be deployed on static hosting platforms (Netlify, Vercel, GitHub Pages)
- All assets can be served directly from CDN or static files
- Express server provides additional functionality and deployment reliability

### Performance Optimization
- Preconnect hints for external resources
- Defer loading of non-critical JavaScript
- Optimized CSS with custom properties
- Semantic HTML for accessibility and SEO

### Security Considerations
- No server-side code reduces attack surface
- Static files only
- External dependencies loaded from reputable CDNs
- Proper robots.txt configuration

### Browser Compatibility
- Modern browser support with graceful degradation
- CSS custom properties with fallbacks
- Progressive enhancement approach
- Responsive design for all device types

## Recent Changes

### Blog System Implementation (July 31, 2025)
- Added complete blog system with Google Sheets integration
- Created blog listing page (blog.html) with responsive design
- Built individual article pages (article.html) with SEO optimization
- Implemented Google Sheets API integration via Sheet.best service
- Added dynamic content loading, category filtering, and sidebar widgets
- Enhanced navigation with Blog menu item
- Created comprehensive documentation and setup guide
- Updated sitemap.xml to include blog pages

### SEO Competition Analysis (July 31, 2025)
- Analyzed competitor Avocats Picovschi (37M visitors, #1 SEO performance)
- Added Schema.org structured data for LegalService and FAQ
- Enhanced meta descriptions with local keywords and CTAs
- Created comprehensive SEO strategy document (SEO-ANALYSIS-Picovschi.md)
- Optimized for Google rankings competition with content strategy plan
- Identified key success factors: content volume, technical SEO, local optimization

### Deployment Fixes (July 30, 2025)
- Updated deployment configuration from cloudrun to autoscale for better compatibility
- Enhanced health check endpoints with multiple routes (/health, /healthz, /healthcheck, /status)
- Added graceful shutdown handling for production deployments
- Improved Express server configuration with proper host binding (0.0.0.0)
- Added detailed service identification in health responses
- Configured environment variables for deployment (HOST, PORT, NODE_ENV)
- Ensured Procfile and start.sh scripts are properly configured

## Development Notes

- The site uses French language throughout
- Professional legal industry styling and terminology
- Accessibility features implemented
- Mobile-first responsive design approach
- Clean, semantic HTML structure
- Modular CSS architecture with custom properties