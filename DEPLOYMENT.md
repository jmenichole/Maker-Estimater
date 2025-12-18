# Deployment Guide

## Deploying to Vercel (Recommended)

Vercel is the recommended platform for this application because it provides:
- Automatic API gateway functionality
- Geolocation headers for location-based pricing
- Serverless function hosting
- Free tier for hobby projects
- Seamless GitHub integration

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub** (if not already done)

2. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New Project"

3. **Import Repository**
   - Select your GitHub repository: `jmenichole/Maker-Estimater`
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value | Description |
   |------|-------|-------------|
   | `OPENAI_API_KEY` | `sk-proj-...` | Your OpenAI API key |
   | `OPENAI_BASE_URL` | (optional) | AI Gateway URL if configured |

   **Important**: Select all environments (Production, Preview, Development)

6. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /path/to/Maker-Estimater
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy: Y
   - Which scope: Select your account
   - Link to existing project: N (first time)
   - Project name: maker-estimater (or your choice)
   - Directory: `./`
   - Override settings: N

5. **Add Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY
   # Paste your OpenAI API key when prompted
   # Select: Production, Preview, Development
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 3: Automatic Deployment with GitHub Integration

Once connected to Vercel:

1. **Automatic Deployments**
   - Every push to `main` branch = Production deployment
   - Every pull request = Preview deployment
   - Preview URLs are generated automatically

2. **Manual Deployments**
   - Go to Vercel Dashboard
   - Select your project
   - Click "Deployments"
   - Click "Redeploy" on any deployment

## Post-Deployment Configuration

### Setting up AI Gateway (Optional but Recommended)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings"
   - Navigate to "AI Gateway"
   - Click "Enable AI Gateway"

2. **Copy the Gateway URL** (looks like):
   ```
   https://gateway.vercel.com/v1/openai
   ```

3. **Add as Environment Variable**:
   - Name: `OPENAI_BASE_URL`
   - Value: The gateway URL from above
   - Environments: All

4. **Redeploy** to apply changes

### Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" > "Domains"
   - Click "Add"
   - Enter your domain (e.g., `calculator.yourdomain.com`)
   - Follow DNS configuration instructions

2. **SSL Certificate**:
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes

## Alternative Deployment Options

### GitHub Pages (Limited Functionality)

⚠️ **Note**: GitHub Pages only supports static hosting. AI features will NOT work without serverless functions.

For static-only version:

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to "Pages"
   - Source: Deploy from a branch
   - Branch: `main`, folder: `/ (root)`
   - Save

2. **Access your site**:
   - `https://jmenichole.github.io/Maker-Estimater/`

3. **Limitations**:
   - No AI-powered estimates
   - No location detection
   - Only fallback calculations work
   - API endpoints not available

### Netlify

1. **Create Netlify account** at [netlify.com](https://netlify.com)

2. **Connect repository**:
   - Click "Add new site"
   - Import from GitHub
   - Select repository

3. **Configure build**:
   - Build command: (leave empty)
   - Publish directory: `.`
   - Functions directory: `api`

4. **Add Environment Variables**:
   - Go to Site settings > Environment variables
   - Add `OPENAI_API_KEY`

5. **Deploy**

⚠️ **Note**: Netlify Functions have different syntax than Vercel. API files may need modifications.

### Self-Hosting with Node.js

For advanced users who want to self-host:

1. **Install dependencies**:
   ```bash
   npm install
   npm install -g http-server
   ```

2. **Set environment variables**:
   ```bash
   export OPENAI_API_KEY="your-key-here"
   ```

3. **Run the application**:
   ```bash
   # Serve static files
   http-server -p 8080
   
   # In another terminal, run API server
   # (requires custom Express.js setup - not included)
   ```

⚠️ **Note**: This requires additional server setup not covered in this guide.

## Troubleshooting Deployment

### Build Fails

- **Check logs** in Vercel Dashboard > Deployments > View logs
- Verify `package.json` is valid JSON
- Ensure Node.js version is 18+

### API Routes Not Working

1. **Verify file structure**:
   ```
   /api
     /estimate.js
     /location.js
   /vercel.json
   ```

2. **Check environment variables** are set in Vercel

3. **Review function logs** in Vercel Dashboard

### "AI service unavailable"

1. **Verify OpenAI API key** is correct
2. **Check OpenAI account** has available credits
3. **Test API key** using OpenAI Playground
4. **Review function logs** for error messages

### Location Detection Not Working

- Location detection requires Vercel deployment
- Local development will show default location
- Vercel headers (`x-vercel-ip-country`) are production-only

## Cost Estimates

### Vercel Pricing

- **Hobby Plan**: FREE
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless functions included
  - Perfect for personal projects

- **Pro Plan**: $20/month
  - Increased limits
  - Team features
  - More function execution time

### OpenAI Pricing

- **GPT-4o-mini**: ~$0.0001-0.0005 per estimate
- **Monthly budget examples**:
  - $5/month = 10,000-50,000 estimates
  - $10/month = 20,000-100,000 estimates

### Total Cost Estimate

For a typical maker business:
- **Vercel**: $0 (hobby) or $20 (pro)
- **OpenAI**: $5-10/month
- **Total**: $5-30/month

## Monitoring & Maintenance

### Monitoring Usage

1. **Vercel Analytics**:
   - Dashboard > Analytics
   - Track page views, API calls
   - Monitor performance

2. **OpenAI Usage**:
   - Visit [platform.openai.com/usage](https://platform.openai.com/usage)
   - Track API calls and costs
   - Set up billing alerts

### Setting Up Alerts

1. **OpenAI Billing Alerts**:
   - Go to OpenAI Billing settings
   - Set usage threshold (e.g., $10)
   - Add email for notifications

2. **Vercel Monitoring**:
   - Enable "Deployment notifications"
   - Get alerts for failed deployments
   - Monitor function errors

## Security Checklist

Before going live:

- [ ] Environment variables are set (not hardcoded)
- [ ] `.env` file is in `.gitignore`
- [ ] API keys are rotated from any test keys
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Rate limiting is considered for public use
- [ ] Error messages don't expose sensitive info
- [ ] Dependencies are up to date
- [ ] GitHub repository is public or properly secured

## Next Steps After Deployment

1. **Test all features** on the live site
2. **Share the URL** with your maker community
3. **Monitor usage** for the first week
4. **Set up billing alerts** to avoid surprises
5. **Consider custom domain** for professional look
6. **Gather feedback** and iterate

---

Need help? Open an issue on GitHub or check the [SETUP.md](SETUP.md) guide.
