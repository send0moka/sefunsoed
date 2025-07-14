feat: add Indonesian language support for posts with language switch functionality

- Add title_id and content_id fields to Posts collection for Indonesian translations
- Implement LanguageProvider context for global language state management
- Add language switch button with flag icons in PostHero component
- Create LanguageAwareRichText component for multilingual content display
- Update payload types to include new Indonesian fields
- Configure admin panel UI with labeled Indonesian input fields
- Add database migration script for new columns (title_id, content_id)
- Update seed files with Indonesian sample content
- Fix field validation by setting Indonesian fields as optional
- Resolve build issues and module resolution errors

Breaking changes:
- Posts collection schema updated with new required fields
- Seed data structure modified to include Indonesian translations

Closes: Language switching functionality for bilingual content management
