# Vercel Analytics Integration

## Setup Vercel Analytics

1. **Enable Vercel Analytics** di dashboard Vercel untuk project ini
2. **Get API Token** dari Vercel dashboard:
   - Go to Settings → Tokens
   - Create new token dengan scope "Read" untuk analytics

3. **Add Environment Variables** di `.env.local`:
```bash
VERCEL_API_TOKEN=your_vercel_api_token_here
VERCEL_TEAM_ID=your_team_id_here  # Optional jika menggunakan team
```

## VisitorsTable Component

Komponen ini menampilkan visitor statistics di footer dengan:

- **Today**: Visitor hari ini
- **Last Week**: Visitor 7 hari terakhir  
- **Last Month**: Visitor 30 hari terakhir
- **All Time**: Total visitor keseluruhan

### Features

- 📊 **Real-time Data**: Fetch dari Vercel Analytics API
- 🔄 **Auto Refresh**: Update setiap kali component di-mount
- 💾 **Caching**: Server-side caching untuk performance
- 🎨 **Dark Theme**: Adaptif dengan theme sistem
- 📱 **Responsive**: Layout adaptif untuk mobile/desktop
- ⚡ **Fallback**: Mock data jika API gagal

### Styling

- **Background**: Dark gray dengan rounded corners
- **Typography**: Monospace numbers untuk alignment
- **Loading**: Skeleton loading animation
- **Timestamp**: Menampilkan waktu update terakhir

## API Endpoint

`/api/analytics/visitors` - Returns visitor statistics:

```json
{
  "today": 123,
  "lastWeek": 856,
  "lastMonth": 3241,
  "allTime": 15678
}
```

## Integration Notes

Saat ini menggunakan mock data. Untuk menggunakan data real dari Vercel Analytics:

1. Uncomment kode Vercel Analytics di `route.ts`
2. Install package `@vercel/analytics` 
3. Setup environment variables
4. Replace mock data dengan actual API calls

## File Structure

```
src/
├── components/VisitorsTable/
│   └── index.tsx                 # Main component
├── app/api/analytics/visitors/
│   └── route.ts                  # API endpoint
└── Footer/
    └── Component.tsx             # Updated footer dengan visitors table
```
