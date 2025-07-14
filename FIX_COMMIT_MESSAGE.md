fix: resolve Vercel deployment error with null Indonesian content handling

Handle null/undefined content_id field in LanguageAwareRichText component
and post detail page to prevent TypeScript compilation errors during deployment.

- Add fallback to English content when Indonesian content is null/undefined
- Update LanguageAwareRichText component to accept nullable Indonesian content
- Ensure type safety for optional Indonesian fields in posts

Fixes Vercel build error:
Type 'undefined' is not assignable to type '{ [k: string]: unknown; root: ... }'
