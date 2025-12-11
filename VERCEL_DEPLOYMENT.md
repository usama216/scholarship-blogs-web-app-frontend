# Vercel Deployment Guide for Frontend

## Important: Environment Variables Setup

Frontend ko Vercel par deploy karne ke liye yeh environment variable set karni hogi:

### Vercel Dashboard me Environment Variables kaise set karein:

1. Vercel Dashboard me jao
2. Apne frontend project ko select karo
3. Settings > Environment Variables me jao
4. Yeh variable add karo:

```
NEXT_PUBLIC_API_URL=https://your-backend-name.vercel.app/api
```

**Important Notes:**
- `your-backend-name.vercel.app` ko apne actual backend Vercel URL se replace karo
- Agar backend abhi deploy nahi hua, pehle backend deploy karo
- Multiple environments (Production, Preview, Development) ke liye alag values set kar sakte ho

### Deployment Steps:

1. GitHub repository me code push karo
2. Vercel me project import karo (if not already done)
3. **Root Directory**: `scholarship-blogs-web-app-frontend` set karo
4. **Framework Preset**: Next.js (auto-detected)
5. **Build Command**: `npm run build` (auto-detected)
6. **Output Directory**: `.next` (auto-detected)
7. Environment variable set karo (as shown above)
8. Deploy karo!

### Common Issues:

**Issue**: API calls fail with CORS error
**Solution**: Backend me `CORS_ORIGINS` environment variable me frontend URL add karo

**Issue**: API calls fail with 404
**Solution**: Check karo ki `NEXT_PUBLIC_API_URL` sahi backend URL point kar raha hai

**Issue**: Images nahi load ho rahi
**Solution**: `next.config.js` me Supabase storage URLs ko `remotePatterns` me add karo

### Testing:

Deploy ke baad frontend URL: `https://your-frontend-name.vercel.app`

Browser console me check karo ki API calls successfully ho rahe hain ya nahi.

