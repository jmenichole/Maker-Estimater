import { OpenAI } from 'openai';

// Initialize OpenAI client with Vercel AI Gateway
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.VERCEL_AI_GATEWAY_URL || 'https://gateway.ai.cloudflare.com/v1/vercel/openai',
});

// Regional pricing multipliers based on cost of living
const regionalMultipliers = {
  'US-CA': 1.3,  // California
  'US-NY': 1.25, // New York
  'US-HI': 1.4,  // Hawaii
  'US-MA': 1.2,  // Massachusetts
  'US-WA': 1.15, // Washington
  'US-DEFAULT': 1.0, // Default US
  'CA': 1.1,     // Canada
  'GB': 1.15,    // United Kingdom
  'AU': 1.2,     // Australia
  'DEFAULT': 1.0 // Rest of world
};

// Material price database (per roll, in USD)
const materialPrices = {
  'premium': 14.99,
  'removable': 13.99,
  'holographic': 19.99,
  'glitter': 17.99,
  'iron-on': 16.99
};

// Standard roll size in square inches (12" x 48")
const ROLL_SIZE = 12 * 48;

function getRegionalMultiplier(location) {
  if (!location) return regionalMultipliers.DEFAULT;
  
  // Check for US states
  if (location.country === 'US' && location.region) {
    const stateKey = `US-${location.region}`;
    return regionalMultipliers[stateKey] || regionalMultipliers['US-DEFAULT'];
  }
  
  // Check for country
  return regionalMultipliers[location.country] || regionalMultipliers.DEFAULT;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      vinylType,
      width,
      height,
      quantity,
      laborRate,
      complexWeeding,
      rush,
      location
    } = req.body;

    // Validate inputs
    if (!vinylType || !width || !height || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate base metrics
    const area = width * height;
    const regionalMultiplier = getRegionalMultiplier(location);
    const baseMaterialPrice = materialPrices[vinylType] || materialPrices.premium;
    const adjustedMaterialPrice = baseMaterialPrice * regionalMultiplier;

    // Prepare AI prompt with context
    const prompt = `As an expert pricing consultant for vinyl crafting businesses, provide an accurate cost estimate for the following project:

Project Details:
- Material: ${vinylType} vinyl
- Dimensions: ${width}" x ${height}" (${area} sq inches per piece)
- Quantity: ${quantity} pieces
- Total material area needed: ${(area * quantity).toFixed(2)} sq inches
- Base material cost: $${baseMaterialPrice.toFixed(2)} per roll (${ROLL_SIZE} sq inches)
- Regional adjusted material cost: $${adjustedMaterialPrice.toFixed(2)} per roll
- Location: ${location?.city || 'Unknown'}, ${location?.region || ''} ${location?.country || 'US'}
- Regional cost multiplier: ${regionalMultiplier.toFixed(2)}x
- Labor rate: $${laborRate || 25}/hour
- Complex weeding required: ${complexWeeding ? 'Yes' : 'No'}
- Rush order: ${rush ? 'Yes (24-48hr)' : 'No'}

Please calculate:
1. Accurate material cost based on area used and waste factor (typically 10-20% for vinyl projects)
2. Labor time estimate considering:
   - Base cutting/preparation time
   - Weeding complexity (${complexWeeding ? '1.5x' : '1x'} multiplier)
   - Application time per piece
   - Setup and cleanup time
3. Overhead costs (15% for equipment wear, utilities, packaging)
4. Appropriate profit margin (20% industry standard)
5. Rush fee if applicable (25% surcharge)
6. Setup fee ($5 standard)

Provide a detailed breakdown in JSON format with:
{
  "materialCost": number,
  "materialWaste": number,
  "laborHours": number,
  "laborCost": number,
  "setupFee": number,
  "overhead": number,
  "profit": number,
  "rushFee": number,
  "subtotal": number,
  "total": number,
  "reasoning": "brief explanation of calculations",
  "recommendations": ["tip1", "tip2"]
}`;

    // Call OpenAI API through Vercel AI Gateway
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert pricing consultant for vinyl crafting businesses. Provide accurate, competitive pricing based on material costs, labor, regional factors, and industry standards. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent pricing
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const aiResponse = completion.choices[0].message.content;
    const estimate = JSON.parse(aiResponse);

    // Add metadata to response
    const response = {
      ...estimate,
      metadata: {
        model: 'gpt-4o-mini',
        timestamp: new Date().toISOString(),
        location: location || { country: 'US' },
        regionalMultiplier,
        projectArea: area,
        quantity
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error('Error generating estimate:', error);
    
    // Provide fallback calculation if AI fails
    const fallbackEstimate = calculateFallbackEstimate(req.body);
    
    return res.status(200).json({
      ...fallbackEstimate,
      metadata: {
        fallback: true,
        error: 'AI estimation unavailable, using fallback calculation'
      }
    });
  }
}

// Fallback calculation function
function calculateFallbackEstimate(data) {
  const {
    vinylType = 'premium',
    width = 0,
    height = 0,
    quantity = 1,
    laborRate = 25,
    complexWeeding = false,
    rush = false,
    location
  } = data;

  const area = width * height;
  const regionalMultiplier = getRegionalMultiplier(location);
  const baseMaterialPrice = materialPrices[vinylType];
  const sqInchPrice = (baseMaterialPrice * regionalMultiplier) / ROLL_SIZE;
  
  const materialCost = area * sqInchPrice * quantity * 1.15; // 15% waste factor
  const materialWaste = materialCost * 0.15;

  let laborTime = 0.25; // Base setup time
  laborTime += (area / 144) * 0.5; // Time per square foot
  if (complexWeeding) laborTime *= 1.5;
  laborTime *= quantity;

  const laborCost = laborTime * laborRate;
  const setupFee = 5;
  const rushFee = rush ? (materialCost + laborCost) * 0.25 : 0;
  const overhead = (materialCost + laborCost + setupFee) * 0.15;
  const profit = (materialCost + laborCost + setupFee + overhead) * 0.20;
  const total = materialCost + laborCost + setupFee + overhead + profit + rushFee;

  return {
    materialCost: parseFloat(materialCost.toFixed(2)),
    materialWaste: parseFloat(materialWaste.toFixed(2)),
    laborHours: parseFloat(laborTime.toFixed(2)),
    laborCost: parseFloat(laborCost.toFixed(2)),
    setupFee,
    overhead: parseFloat(overhead.toFixed(2)),
    profit: parseFloat(profit.toFixed(2)),
    rushFee: parseFloat(rushFee.toFixed(2)),
    subtotal: parseFloat((materialCost + laborCost + setupFee + overhead + profit).toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    reasoning: 'Fallback calculation using standard industry formulas',
    recommendations: [
      'Consider bulk ordering for quantity discounts',
      'Complex designs may require additional time'
    ]
  };
}
