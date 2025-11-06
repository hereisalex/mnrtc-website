# Developer Dashboard Documentation

The Minnesota Retro Tech website includes a password-protected developer/admin dashboard for debugging and analytics. This document explains how to set it up and use it.

## Overview

The dashboard provides:
- **Traffic Analytics**: Page view charts and referrer statistics
- **Error Log Viewer**: Inspect runtime errors and warnings
- **System Health**: Monitor Supabase connectivity and API status

Access is restricted to users with `admin` or `developer` roles in Supabase Auth.

## Prerequisites

- Supabase project with authentication enabled
- Node.js 18+ and npm/yarn
- Environment variables configured (see below)

## Setup

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
# Public Supabase credentials (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Service role key (required for API routes)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Important**: The `SUPABASE_SERVICE_ROLE_KEY` should never be exposed to the client. It's only used in server-side API routes.

### 2. Database Schema

Run the SQL schema file in your Supabase SQL editor:

```bash
# Option 1: Via Supabase Dashboard
# Go to SQL Editor → New Query → Paste contents of supabase/dashboard.sql → Run

# Option 2: Via Supabase CLI
supabase db execute -f supabase/dashboard.sql
```

This creates:
- `page_views` table for tracking page visits
- `error_logs` table for error tracking
- Aggregation functions for analytics
- Row-level security policies

### 3. Create Admin/Developer Users

#### Option A: Via Supabase Dashboard

1. Go to Authentication → Users
2. Create a new user or select an existing one
3. Click "Edit user" → "Raw App Meta Data"
4. Add role metadata:

```json
{
  "role": "admin"
}
```

Or for developers:

```json
{
  "role": "developer"
}
```

#### Option B: Via Supabase SQL

```sql
-- Update an existing user's metadata
UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
  COALESCE(raw_app_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'admin@example.com';
```

#### Option C: Via Supabase CLI

```bash
# Create user with role
supabase auth admin create-user \
  --email admin@example.com \
  --password "secure-password" \
  --metadata '{"role": "admin"}'
```

### 4. Access the Dashboard

1. Start the development server: `npm run dev`
2. Navigate to `/login`
3. Sign in with an admin/developer account
4. You'll be redirected to `/dashboard`

## Dashboard Features

### Analytics Page (`/dashboard/analytics`)

- **Daily page view chart**: Visualizes traffic over a date range (default: last 14 days)
- **Top referrers table**: Shows where visitors are coming from
- **Metrics**: Total views, average per day, peak day
- **Date filters**: Adjust the time window for analysis

### Error Logs Page (`/dashboard/errors`)

- **Filterable error log**: View errors by severity level (debug, info, warn, error, fatal)
- **Date range filtering**: Focus on specific time periods
- **Detailed inspection**: Expand entries to see stack traces and context
- **Pagination**: Navigate through large log sets

### System Health Page (`/dashboard/health`)

- **Supabase status**: Connection status and latency
- **Runtime environment**: Node.js version, deployment region, uptime
- **Manual refresh**: Ping services on demand

## Frontend Telemetry

The dashboard automatically tracks page views and errors from the frontend.

### Page View Tracking

Page views are automatically tracked via the `PageViewTracker` component in the root layout. Each navigation triggers a POST to `/api/telemetry/track` with:
- Current path
- Referrer URL
- Session ID (UUID stored in sessionStorage)
- User agent

Tracking is throttled (minimum 2 seconds between requests) to avoid excessive API calls.

### Error Logging

Errors can be logged manually using the `logError` function:

```typescript
import { logError } from '@/lib/telemetry';

// Log an error
logError('Something went wrong', {
  level: 'error',
  stack: error.stack,
  context: { userId: '123', action: 'checkout' },
  source: 'CheckoutComponent',
});
```

The `TelemetryErrorBoundary` component automatically catches React errors and logs them.

## API Routes

### `/api/telemetry/track` (POST)

Records a page view. Used internally by `PageViewTracker`.

**Request body:**
```json
{
  "path": "/dashboard/analytics",
  "referrer": "https://example.com",
  "sessionId": "uuid-v4",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### `/api/telemetry/log-error` (POST)

Records an error log entry. Used internally by error logging utilities.

**Request body:**
```json
{
  "message": "Error message",
  "level": "error",
  "stack": "Error stack trace...",
  "context": { "key": "value" },
  "source": "ComponentName",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### `/api/health` (GET)

Returns system health status. Used by the health dashboard page.

**Response:**
```json
{
  "uptimeSeconds": 3600,
  "timestamp": "2025-01-15T10:30:00Z",
  "environment": {
    "nodeVersion": "v20.10.0",
    "region": "iad1"
  },
  "services": {
    "supabase": {
      "status": "ok",
      "latencyMs": 45
    }
  }
}
```

## Security

- Dashboard routes are protected by middleware checking for `admin` or `developer` roles
- Unauthorized users are redirected to `/login`
- Database tables use Row-Level Security (RLS) policies
- Service role key is only used server-side
- Telemetry endpoints are public but rate-limited

## Troubleshooting

### "Telemetry storage unavailable"

- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in your environment
- Verify the Supabase URL and service role key are correct
- Ensure the database schema has been applied

### "Your account does not have developer dashboard access"

- Verify the user's `app_metadata.role` or `user_metadata.role` is set to `admin` or `developer`
- Check Supabase Auth user metadata in the dashboard
- Try signing out and back in after updating metadata

### No page views appearing

- Check browser console for telemetry errors
- Verify `/api/telemetry/track` endpoint is accessible
- Ensure `page_views` table exists and RLS allows inserts (service role bypasses RLS)

### Charts not loading

- Verify the `dashboard_page_views_daily` and `dashboard_top_referrers` functions exist
- Check Supabase logs for SQL errors
- Ensure date range is valid (from_date <= to_date)

## Maintenance

### Cleaning Old Data

To prevent database bloat, periodically clean old telemetry data:

```sql
-- Delete page views older than 90 days
DELETE FROM public.page_views
WHERE created_at < NOW() - INTERVAL '90 days';

-- Delete error logs older than 30 days (keep errors longer)
DELETE FROM public.error_logs
WHERE created_at < NOW() - INTERVAL '30 days';
```

### Monitoring

- Check Supabase dashboard for table sizes and query performance
- Monitor API route logs for errors
- Review error logs dashboard regularly for recurring issues

## Support

For issues or questions:
- Check Supabase logs in the dashboard
- Review Next.js server logs
- Contact the development team

