export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to get location from Vercel headers
    const country = req.headers['x-vercel-ip-country'] || 'US';
    const region = req.headers['x-vercel-ip-country-region'] || '';
    const city = req.headers['x-vercel-ip-city'] || '';
    const timezone = req.headers['x-vercel-ip-timezone'] || 'America/New_York';

    // Return location data
    return res.status(200).json({
      country,
      region,
      city,
      timezone,
      detected: true
    });

  } catch (error) {
    console.error('Error detecting location:', error);
    
    // Return default US location
    return res.status(200).json({
      country: 'US',
      region: '',
      city: 'Unknown',
      timezone: 'America/New_York',
      detected: false
    });
  }
}
