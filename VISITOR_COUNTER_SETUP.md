# GitHub Issues Visitor Counter Setup

This guide will help you set up the GitHub Issues-based visitor counter for your Minnesota Retro Technology Club website.

## How It Works

The visitor counter uses GitHub's Issues API to track visits by:
1. Creating a hidden issue in your repository to store the counter data
2. Incrementing the counter on each unique visitor session
3. Storing the count in the issue body as JSON data
4. Using sessionStorage to prevent duplicate counts from the same browser session

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "MNRTC Visitor Counter"
4. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `public_repo` (Access public repositories)
5. Click "Generate token"
6. **Copy the token immediately** - you won't see it again!

### 2. Add Token to GitHub Repository Secrets

1. Go to your repository: `https://github.com/hereisalex/mnrtc-website`
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `MNRTC_GITHUB_TOKEN`
5. Value: Paste your personal access token
6. Click "Add secret"

### 3. Alternative: Use Public Read-Only Token (Less Secure)

If you prefer not to use a personal token with full repo access, you can:

1. Create a token with only `public_repo` scope
2. Update the `NEXT_PUBLIC_MNRTC_GITHUB_TOKEN` environment variable in your deployment
3. Set it as a repository secret named `MNRTC_GITHUB_TOKEN`

**Note**: This approach is less secure but works for public repositories.

### 4. Deploy and Test

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add GitHub Issues visitor counter"
   git push origin main
   ```

2. Wait for GitHub Pages to deploy
3. Visit your site and check the visitor counter
4. Check your repository issues - you should see a new issue titled "Visitor Counter - Hidden"

## How the Counter Works

### First Visit
- Creates a hidden GitHub issue with title "Visitor Counter - Hidden"
- Sets initial count to 1000
- Stores session ID to prevent duplicate counts

### Subsequent Visits
- Increments the counter in the existing issue
- Updates the issue body with new count and timestamp
- Uses sessionStorage to track if visitor already counted in this session

### Fallback Behavior
- If GitHub API fails, shows cached count from localStorage
- If no cached count, shows a random realistic number
- Gracefully handles network errors and API rate limits

## Monitoring the Counter

### Check Counter Issue
1. Go to your repository issues
2. Look for "Visitor Counter - Hidden" issue
3. The issue body contains JSON data with:
   ```json
   {
     "count": 1234,
     "lastUpdated": "2025-01-XX...",
     "sessionId": "session_..."
   }
   ```

### GitHub API Rate Limits
- GitHub API allows 5000 requests per hour for authenticated users
- Each visitor increment uses 2 API calls (find + update)
- Should handle ~2500 visitors per hour

## Troubleshooting

### Counter Not Working
1. Check browser console for errors
2. Verify GitHub token has correct permissions
3. Check if the counter issue was created in your repository
4. Ensure the repository is public (required for GitHub Pages)

### API Rate Limits
- If you hit rate limits, the counter will show cached values
- Rate limits reset every hour
- Consider implementing caching for high-traffic scenarios

### Token Security
- Never commit tokens to your repository
- Use GitHub Secrets with name `MNRTC_GITHUB_TOKEN` (not `GITHUB_*`)
- Rotate tokens periodically
- Use minimal required permissions

## Customization

### Starting Count
Edit `lib/github-counter.ts` and change the initial count from 1000:
```typescript
const newCount = 1000; // Change this number
```

### Counter Display
Edit `components/geocities/VisitorCounter.tsx` to modify:
- Number formatting
- Display style
- Error messages
- Loading states

### Session Tracking
Modify session tracking logic in `lib/github-counter.ts`:
- Change session duration
- Add IP-based tracking (requires backend)
- Implement more sophisticated duplicate detection

## Security Considerations

- The counter issue is visible to anyone with repository access
- Consider making the repository private if you want to hide the counter data
- Token should have minimal required permissions
- Consider implementing additional validation for production use

Your visitor counter is now ready to track real visitors to your Minnesota Retro Technology Club website! 🎉
