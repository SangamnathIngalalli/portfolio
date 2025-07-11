# AI Use Context

This document is intended to store relevant information for AI usage in this project. It will be updated as new context, rules, or important notes for AI agents and developers arise.

## Project Overview
This project is a personal portfolio website for Sangamnath R Ingalalli, a QA Automation Engineer. It showcases professional experience, technical skills, featured projects, and provides contact information. The site is designed to highlight expertise in automation, testing, and DevOps, and serves as a digital resume and professional hub.

## Main Technologies Used
- HTML, CSS, JavaScript (Vanilla)
- Service Worker for offline support (`sw.js`)
- Responsive design and modern UI/UX principles
- No backend; static site

## Project Structure
- `index.html`: Main entry point for the portfolio
- `css/`: Stylesheets (mainly `style.css`)
- `js/`: JavaScript files for interactivity and lazy loading
- `resources/`: Images and downloadable assets (e.g., profile picture, resume PDF)
- `Docs/`: Project documentation and templates
- `robots.txt`, `sitemap.xml`: SEO and web crawler configuration
- `.Cursor/rules/`: Cursor AI configuration and rules

## Cursor AI Rules Configuration
The project includes a comprehensive set of Cursor AI rules in `.Cursor/rules/`:

### `.Cursor/rules/generate.mdc`
- Guidelines for file generation with focus on consistency, accessibility, and performance
- File naming conventions (kebab-case)
- Specific rules for HTML, CSS, JavaScript, documentation, and asset files
- Quality checklist for all generated files

### `.Cursor/rules/workflow.mdc` (Always Applied)
- 5-phase task execution workflow: Assessment → Planning → Execution → QA → Integration
- Decision-making framework for file creation, modification, and refactoring
- Error handling, communication protocols, and performance considerations
- Security guidelines, accessibility standards, and testing strategies

### `.Cursor/rules/prompts.mdc`
- Reusable prompt templates for common tasks
- Portfolio-specific prompts for content updates, skill additions, project additions
- Accessibility, SEO, testing, and security prompt templates
- Documentation and performance optimization prompts

## Special Rules & Conventions
- All documentation for AI and developers is kept in the `Docs/` directory
- Use `Docs/Ai_use_context.md` to record any new rules, context, or decisions relevant to AI agents or future contributors
- Follow the file/folder naming conventions as described in `Docs/project_structure.md`
- UI/UX guidelines and design system are documented in `Docs/UI_UX_doc.md`
- Implementation plans for new features should use the template in `Docs/Implementation_template.md`
- Cursor AI rules in `.Cursor/rules/` are automatically applied to guide AI behavior

## Notes for AI Agents
- When generating new files or making changes, always check for existing documentation and templates in `Docs/`
- Follow the Cursor AI rules in `.Cursor/rules/` for consistent file generation and workflow execution
- Use the prompt templates in `.Cursor/rules/prompts.mdc` for standardized task execution
- Maintain consistency with the current structure and design principles
- Update this file whenever new context, rules, or conventions are introduced
- The workflow rules are always applied, so follow the 5-phase execution process

## Recent Updates
- Added comprehensive Cursor AI rules configuration in `.Cursor/rules/`
- Established standardized workflow and file generation guidelines
- Created reusable prompt templates for common portfolio tasks
- Set workflow rules to always apply for consistent AI behavior

---

*This file is a living document and should be maintained alongside other project documentation.* 