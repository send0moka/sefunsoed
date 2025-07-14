feat: add Timeline layout block with comprehensive event management

- Add new Timeline block component with visual timeline structure
- Implement flexible date formatting (full/monthYear/year) using date-fns
- Add status-based color coding (completed/in-progress/upcoming/cancelled)
- Include 6 icon types for timeline nodes (circle/check/clock/calendar/x/star)
- Create responsive design with vertical timeline spine and event cards
- Integrate Timeline block into Pages and Posts collections
- Add rich text support for event descriptions
- Implement hover effects and smooth transitions
- Add TypeScript types and payload schema integration
- Create demo page at /timeline-demo with sample data

BREAKING CHANGE: Adds new Timeline block to layout options, requires database migration for new block tables

Co-authored-by: GitHub Copilot
