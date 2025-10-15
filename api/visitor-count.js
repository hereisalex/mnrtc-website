// This is a placeholder API route for static export
// The actual counter logic will be handled by GitHub Actions

export default function handler(req, res) {
  // For static export, we'll use a different approach
  // This file is here for compatibility but won't be used in static export
  
  if (req.method === 'POST') {
    // Return a mock response for development
    const mockCount = Math.floor(Math.random() * 5000) + 1000;
    
    res.status(200).json({
      count: mockCount,
      message: 'Counter updated (mock)',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
