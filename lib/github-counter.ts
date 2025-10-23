// GitHub Issues-based visitor counter
// Uses GitHub Issues API to track visitor counts

const GITHUB_OWNER = 'hereisalex';
const GITHUB_REPO = 'mnrtc-website';
const COUNTER_ISSUE_TITLE = 'Visitor Counter - Hidden';

// GitHub token for API authentication
// Set NEXT_PUBLIC_MNRTC_GITHUB_TOKEN environment variable with a valid GitHub token
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_MNRTC_GITHUB_TOKEN;

interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  state: string;
}

interface CounterData {
  count: number;
  lastUpdated: string;
  sessionId: string;
}

export async function incrementVisitorCount(): Promise<number> {
  try {
    // Generate a session ID to avoid duplicate counts from the same session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Check if we've already counted this session
    const existingSession = localStorage.getItem('visitor_count_session');
    if (existingSession && existingSession === sessionId) {
      // Return cached count for this session
      const cachedCount = localStorage.getItem('visitor_count');
      return cachedCount ? parseInt(cachedCount) : 1000;
    }

    // Find the counter issue
    const counterIssue = await findCounterIssue();
    
    if (!counterIssue) {
      // Create a new counter issue if it doesn't exist
      const newCount = 1;
      await createCounterIssue(newCount, sessionId);
      localStorage.setItem('visitor_count', newCount.toString());
      localStorage.setItem('visitor_count_session', sessionId);
      return newCount;
    }

    // Parse the current count from the issue body
    const counterData = parseCounterData(counterIssue.body);
    const newCount = counterData.count + 1;

    // Update the issue with the new count
    await updateCounterIssue(counterIssue.number, newCount, sessionId);
    
    // Cache the result
    localStorage.setItem('visitor_count', newCount.toString());
    localStorage.setItem('visitor_count_session', sessionId);
    
    return newCount;
  } catch (error) {
    console.error('Failed to increment visitor count:', error);
    throw error; // Re-throw to let the component handle the error
  }
}

export async function getCurrentCount(): Promise<number> {
  try {
    const counterIssue = await findCounterIssue();
    
    if (!counterIssue) {
      return 1; // Default starting count
    }

    const counterData = parseCounterData(counterIssue.body);
    return counterData.count;
  } catch (error) {
    console.error('Failed to get current count:', error);
    throw error; // Re-throw to let the component handle the error
  }
}

export async function resetCounter(): Promise<void> {
  try {
    // Check if we have a valid token
    if (!GITHUB_TOKEN) {
      console.warn('No GitHub token provided - cannot reset counter');
      throw new Error('No GitHub token provided');
    }

    const counterIssue = await findCounterIssue();
    
    if (counterIssue) {
      // Close the existing issue
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${counterIssue.number}`,
        {
          method: 'PATCH',
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'Authorization': `token ${GITHUB_TOKEN}`,
          },
          body: JSON.stringify({
            state: 'closed',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to close counter issue: ${response.status}`);
      }
    }

    // Clear local storage
    localStorage.removeItem('visitor_count');
    localStorage.removeItem('visitor_count_session');
    
    console.log('Counter reset successfully');
  } catch (error) {
    console.error('Failed to reset counter:', error);
    throw error;
  }
}

async function findCounterIssue(): Promise<GitHubIssue | null> {
  try {
    // Check if we have a valid token
    if (!GITHUB_TOKEN) {
      console.warn('No GitHub token provided - using fallback counter');
      return null;
    }

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?state=open&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('GitHub API authentication failed - using fallback counter');
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const issues: GitHubIssue[] = await response.json();
    return issues.find(issue => issue.title === COUNTER_ISSUE_TITLE) || null;
  } catch (error) {
    console.warn('Failed to find counter issue, using fallback:', error);
    return null;
  }
}

async function createCounterIssue(count: number, sessionId: string): Promise<void> {
  // Check if we have a valid token
  if (!GITHUB_TOKEN) {
    console.warn('No GitHub token provided - cannot create counter issue');
    throw new Error('No GitHub token provided');
  }

  const counterData: CounterData = {
    count,
    lastUpdated: new Date().toISOString(),
    sessionId,
  };

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        title: COUNTER_ISSUE_TITLE,
        body: `<!-- VISITOR COUNTER DATA -->\n\`\`\`json\n${JSON.stringify(counterData, null, 2)}\n\`\`\`\n\nThis issue is used to track visitor count for the Minnesota Retro Technology Club website. Please do not close or modify this issue.`,
        labels: ['visitor-counter', 'hidden'],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to create counter issue: ${response.status}`);
  }
}

async function updateCounterIssue(issueNumber: number, count: number, sessionId: string): Promise<void> {
  // Check if we have a valid token
  if (!GITHUB_TOKEN) {
    console.warn('No GitHub token provided - cannot update counter issue');
    throw new Error('No GitHub token provided');
  }

  const counterData: CounterData = {
    count,
    lastUpdated: new Date().toISOString(),
    sessionId,
  };

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}`,
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        body: `<!-- VISITOR COUNTER DATA -->\n\`\`\`json\n${JSON.stringify(counterData, null, 2)}\n\`\`\`\n\nThis issue is used to track visitor count for the Minnesota Retro Technology Club website. Please do not close or modify this issue.`,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update counter issue: ${response.status}`);
  }
}

function parseCounterData(body: string): CounterData {
  try {
    const jsonMatch = body.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
  } catch (error) {
    console.error('Failed to parse counter data:', error);
  }

  // Fallback
  return {
    count: 1,
    lastUpdated: new Date().toISOString(),
    sessionId: 'unknown',
  };
}