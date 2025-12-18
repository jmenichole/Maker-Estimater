# AI-Powered Maker Estimater - Setup Guide

This guide will help you set up the AI-powered pricing features using Vercel AI Gateway and OpenAI.

## Prerequisites

- Node.js 18+ installed
- A Vercel account (free tier works)
- An OpenAI API account

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the key (you won't be able to see it again!)
5. Keep it secure - never commit it to Git

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Test Locally

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` and test the calculator.

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

### 6. Configure Environment Variables in Vercel

**Important**: Environment variables must be configured in the Vercel Dashboard, not in `vercel.json`. This is for security - never commit API keys to your repository.

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:

   **Required:**
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (sk-proj-...)
   - **Environments**: Select all (Production, Preview, Development)

   **Optional:**
   - **Name**: `VERCEL_AI_GATEWAY_URL`
   - **Value**: Your AI Gateway URL (if using Vercel AI Gateway)
   - **Environments**: Select all (Production, Preview, Development)

4. Click "Save"

5. Redeploy your application for changes to take effect

## Optional: Vercel AI Gateway Setup

The Vercel AI Gateway provides additional benefits like caching, analytics, and rate limiting.

### Setting Up AI Gateway

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings** > **AI Gateway**
3. Enable AI Gateway for your project
4. Copy the gateway URL provided
5. Add it as an environment variable:

   - **Name**: `VERCEL_AI_GATEWAY_URL`
   - **Value**: The gateway URL from Vercel
   - **Environments**: Select all

### Benefits of AI Gateway

- **Caching**: Reduces API costs by caching similar requests
- **Analytics**: Track API usage and costs
- **Rate Limiting**: Prevent abuse and control costs
- **Fallback**: Automatic fallback if OpenAI is down
- **Cost Control**: Set spending limits

## Features Explained

### AI-Powered Pricing

The calculator uses OpenAI's GPT-4o-mini model to:

- Analyze material costs with waste factors
- Calculate accurate labor time estimates
- Consider project complexity
- Apply regional pricing adjustments
- Generate smart recommendations

### Location-Based Pricing

The system automatically detects user location using Vercel's geolocation headers and adjusts pricing based on:

- Regional cost of living multipliers
- Local market rates
- Material availability

**Regional Multipliers:**
- California (CA): 1.3x
- New York (NY): 1.25x
- Hawaii (HI): 1.4x
- Massachusetts (MA): 1.2x
- Washington (WA): 1.15x
- Canada: 1.1x
- United Kingdom: 1.15x
- Australia: 1.2x
- Default US: 1.0x
- Other regions: 1.0x

### Fallback Calculation

If the AI service is unavailable, the calculator automatically falls back to a traditional calculation method, ensuring the app always works.

## Cost Considerations

### OpenAI API Costs

- Model: GPT-4o-mini
- Approximate cost: $0.0001-0.0005 per calculation
- Budget: ~$5/month supports 10,000-50,000 calculations

### Free Tier Options

1. **OpenAI Free Trial**: New accounts get $5 in free credits
2. **Vercel Free Tier**: Includes generous serverless function limits
3. **No cost for static hosting**: The app works offline as a PWA

### Cost Optimization Tips

1. **Use AI Gateway caching** to reduce duplicate API calls
2. **Set up billing alerts** in OpenAI dashboard
3. **Monitor usage** in Vercel analytics
4. **Consider rate limiting** for public deployments

## Troubleshooting

### "AI service unavailable" message

- Check that `OPENAI_API_KEY` is set correctly in Vercel
- Verify your OpenAI account has available credits
- Check OpenAI API status at [status.openai.com](https://status.openai.com)

### Location detection not working

- Location detection requires deployment to Vercel
- Local development defaults to US location
- Vercel headers are only available in production/preview

### API calls failing

1. Check Vercel function logs in the dashboard
2. Verify environment variables are set for all environments
3. Ensure OpenAI API key is valid and has credits
4. Check that the API endpoint is accessible

### Deployment issues

- Ensure `vercel.json` is in the root directory
- Check that `api/` folder contains the serverless functions
- Verify Node.js version is 18 or higher
- Review Vercel deployment logs for errors

## Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore` for a reason
2. **Use environment variables** - Never hardcode API keys
3. **Rotate keys regularly** - Change API keys periodically
4. **Set up rate limiting** - Prevent abuse in production
5. **Monitor usage** - Watch for unusual activity
6. **Use AI Gateway** - Additional security layer

## Support

- **Issues**: Open an issue on GitHub
- **OpenAI Help**: [help.openai.com](https://help.openai.com)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

## Next Steps

After setup:

1. Test all calculator features
2. Monitor initial API usage
3. Set up billing alerts
4. Customize regional multipliers if needed
5. Share with your maker community!

---

Made with ❤️ for the crafting community
