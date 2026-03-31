# SKZ Peptides - Supabase Integration Setup

This guide will help you set up Supabase to sync orders across all devices.

## Step 1: Set up Supabase Database

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor** (left sidebar)
3. **Create a new query** and paste the contents of `supabase-setup.sql`
4. **Run the query** to create the orders table

## Step 2: Get Your Supabase Credentials

1. **Go to Project Settings** → **API**
2. **Copy your Project URL** (looks like: `https://xxxxx.supabase.co`)
3. **Copy your Anon Key** (public key, starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. **Open `.env.local`** in the project root
2. **Replace the placeholder values:**

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-actual-key
```

## Step 4: Switch to New Admin Context

Replace the import in `src/pages/Admin.jsx`:

```jsx
// Change this:
import { AdminProvider } from '../context/AdminContext'

// To this:
import { AdminProvider } from '../context/AdminContextV2'
```

## Step 5: Deploy and Test

1. **Build and deploy:**
```bash
npm run build
npx wrangler pages deploy dist --project-name skzpeptides --branch main --commit-dirty=true
```

2. **Test sync across devices:**
   - Open admin panel on Device A
   - Create a test order
   - Open admin panel on Device B
   - Verify the order appears instantly

## Features After Setup

✅ **Real-time sync** - Orders sync across all devices instantly
✅ **Offline support** - Works offline, syncs when back online
✅ **Sync status indicator** - Shows connection status (Synced/Syncing/Error/Local Only)
✅ **Automatic backup** - Orders stored in both Supabase and localStorage
✅ **Force sync** - Manual sync button for troubleshooting

## Troubleshooting

**Orders not syncing?**
- Check your Supabase credentials in `.env.local`
- Look for sync status indicator in admin panel
- Use "Retry" button if sync shows error

**Still seeing different orders on different devices?**
- Clear browser cache/localStorage on all devices
- Force sync using the sync status button
- Check Supabase dashboard to see if orders are being stored

**Want to migrate existing orders?**
1. Export orders from your main device (Export button)
2. Check the exported JSON file
3. Orders will automatically import to Supabase on next page load

## Security Notes

- The current setup allows all operations (good for single admin)
- For multiple admins, consider implementing proper authentication
- Supabase RLS (Row Level Security) is enabled but currently allows all access
- Consider restricting access based on your needs

## Rollback Plan

If something goes wrong, you can rollback by:
1. Changing the import back to `AdminContext` (from `AdminContextV2`)
2. Your localStorage data will still be there
3. Export/import can move data between systems