# Project Structure

This document defines the folder and file organization for the portfolio project.

## Root Structure
```
portfolio/
├── index.html                 # Main entry point and portfolio content
├── css/
│   └── style.css             # Main stylesheet with design system
├── js/
│   ├── main.js               # Core JavaScript functionality
│   └── lazyload.js           # Image lazy loading implementation
├── resources/
│   ├── image/
│   │   └── profile.jpeg      # Profile picture (139KB)
│   └── Sangamnath_QA_Automation_Engineer_8197775778.pdf  # Downloadable CV
├── Docs/                     # Project documentation
│   ├── README.md             # Documentation overview
│   ├── Ai_use_context.md     # AI context and rules
│   ├── context.md            # Project background and goals
│   ├── project_structure.md  # This file
│   ├── UI_UX_doc.md          # Design system and UX guidelines
│   └── Implementation_template.md  # Feature implementation template
├── .Cursor/
│   └── rules/                # Cursor AI configuration
│       ├── generate.mdc      # File generation guidelines
│       ├── workflow.mdc      # Task execution workflow (always applied)
│       └── prompts.mdc       # Reusable prompt templates
├── robots.txt                # Search engine crawling rules
├── sitemap.xml               # Site structure for search engines
├── sw.js                     # Service worker for offline functionality
└── README.md                 # Project overview and links
```

## Folder Details

### `/` (Root Directory)
- **Purpose**: Contains main application files and configuration
- **Key Files**:
  - `index.html`: Complete portfolio with semantic HTML structure
  - `robots.txt`: SEO configuration for web crawlers
  - `sitemap.xml`: XML sitemap for search engine indexing
  - `sw.js`: Service worker for PWA functionality and offline support
  - `README.md`: Project overview with badges and contact information

### `/css/`
- **Purpose**: Stylesheets and design system
- **Files**:
  - `style.css`: Complete design system with CSS custom properties, responsive design, animations, and accessibility features

### `/js/`
- **Purpose**: JavaScript functionality and interactivity
- **Files**:
  - `main.js`: Core functionality including typing animation, parallax effects, tech stack tabs, and smooth scrolling
  - `lazyload.js`: Image lazy loading for performance optimization

### `/resources/`
- **Purpose**: Static assets and downloadable content
- **Structure**:
  - `/image/`: Profile pictures and visual assets
  - PDF files: Downloadable resume and professional documents

### `/Docs/`
- **Purpose**: Project documentation and AI integration
- **Files**:
  - `README.md`: Documentation index and navigation
  - `Ai_use_context.md`: AI context, rules, and project information
  - `context.md`: Project background, goals, and technical architecture
  - `project_structure.md`: This file - file organization guide
  - `UI_UX_doc.md`: Design system, user journeys, and accessibility guidelines
  - `Implementation_template.md`: Template for feature implementation plans

### `/.Cursor/rules/`
- **Purpose**: Cursor AI configuration and development guidelines
- **Files**:
  - `generate.mdc`: File generation standards and quality checklist
  - `workflow.mdc`: 5-phase task execution workflow (always applied)
  - `prompts.mdc`: Reusable prompt templates for common tasks

## File Naming Conventions

### General Rules
- **Kebab-case**: Use hyphens for multi-word filenames (e.g., `lazy-load.js`, `style-sheet.css`)
- **Descriptive Names**: File names should clearly indicate their purpose
- **Consistent Extensions**: Use appropriate file extensions (.html, .css, .js, .md)

### Specific Conventions
- **HTML Files**: Use semantic names (e.g., `index.html` for main page)
- **CSS Files**: Use descriptive names with `.css` extension
- **JavaScript Files**: Use camelCase or kebab-case with `.js` extension
- **Documentation**: Use descriptive names with `.md` extension
- **Images**: Use descriptive names with appropriate extensions (.jpeg, .png, .svg)
- **Assets**: Use descriptive names for downloadable content

### Cursor AI Rules Files
- **Extension**: Use `.mdc` extension for Cursor AI rule files
- **Naming**: Use descriptive names that indicate the rule type (generate, workflow, prompts)
- **Location**: Store in `.Cursor/rules/` directory

## File Organization Principles

### Separation of Concerns
- **HTML**: Structure and content only
- **CSS**: All styling and design system
- **JavaScript**: Interactivity and functionality
- **Documentation**: Organized by purpose and audience

### Accessibility
- **Semantic HTML**: Use appropriate HTML5 elements
- **ARIA Labels**: Include proper accessibility attributes
- **Alt Text**: Provide descriptive alt text for images

### Performance
- **Optimized Assets**: Compress images and minify code
- **Lazy Loading**: Implement for large assets
- **Service Worker**: Enable offline functionality

### SEO
- **Meta Tags**: Include comprehensive meta information
- **Structured Data**: Use JSON-LD for rich snippets
- **Sitemap**: Maintain current sitemap.xml
- **Robots.txt**: Configure proper crawling rules

---

*Keep this document updated as the project structure changes.* 