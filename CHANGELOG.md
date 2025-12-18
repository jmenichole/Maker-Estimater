# Changelog

All notable changes to the Maker Estimater project.

## [2.0.0] - 2025-12-18

### 🚀 Major Release: AI-Powered Pricing

This release transforms the Maker Estimater into an intelligent pricing tool powered by artificial intelligence and location awareness.

### ✨ Added

#### AI Integration
- **AI-Powered Pricing Engine**: Integration with OpenAI GPT-4o-mini for intelligent cost estimation
- **Smart Recommendations**: AI-generated tips and insights for each quote
- **Cost Analysis**: AI reasoning explaining pricing decisions
- **Waste Factor Analysis**: Intelligent material waste calculation

#### Location Features
- **Automatic Location Detection**: Uses Vercel geolocation headers
- **Regional Pricing Adjustments**: 1.0x to 1.4x multipliers based on cost of living
- **Supported Regions**: 
  - US states (CA, NY, HI, MA, WA, and default)
  - Canada, United Kingdom, Australia
  - Default multiplier for other regions

#### API Endpoints
- `/api/estimate` - AI-powered pricing estimates
- `/api/location` - Geolocation detection

#### User Experience
- **AI Status Indicator**: Green banner showing when AI features are active
- **Enhanced Loading States**: Animated spinner during AI processing
- **Richer Quote Display**: 
  - Material cost breakdown with waste factor
  - Location information
  - Regional pricing multiplier display
  - AI reasoning section
  - Smart recommendations

#### Documentation
- **QUICKSTART.md**: 5-minute deployment guide
- **SETUP.md**: Comprehensive setup instructions
- **DEPLOYMENT.md**: Multi-platform deployment guide
- Updated README.md with AI features

#### Infrastructure
- **Serverless Functions**: Vercel-compatible API routes
- **Environment Configuration**: `.env.example` template
- **Security**: `.gitignore` for sensitive files
- **Dependencies**: OpenAI SDK integration

### 🔧 Changed

- Enhanced frontend to call AI pricing API
- Updated UI with AI-powered estimate display
- Improved error handling with graceful fallback
- Renamed environment variable: `VERCEL_AI_GATEWAY_URL` → `OPENAI_BASE_URL`
- Modernized project structure with API directory

### 🛡️ Security

- ✅ CodeQL security scan: 0 vulnerabilities
- ✅ Dependency check: No security issues
- ✅ Environment variables for all secrets
- ✅ CORS properly configured
- ✅ No hardcoded API keys

### 🐛 Fixed

- Fixed waste factor double-counting in fallback calculation
- Fixed OpenAI baseURL fallback to use direct endpoint
- Removed unused `@vercel/ai` dependency

### 💰 Cost Impact

- **New Costs**: ~$5-10/month for OpenAI API usage (typical maker business)
- **Vercel**: Still free on hobby tier
- **Benefit**: More accurate pricing = better profitability

### 🔄 Backward Compatibility

- ✅ **Fully backward compatible**: Works offline with fallback calculations
- ✅ **No breaking changes**: Existing features remain unchanged
- ✅ **Progressive enhancement**: AI features enhance but don't replace core functionality

### 📊 Performance

- **API Response Time**: ~1-3 seconds for AI-powered estimates
- **Fallback**: Instant calculation if AI unavailable
- **Serverless**: Auto-scales with traffic
- **Caching**: Support for AI Gateway caching (optional)

### 🎯 Migration Guide

**For Existing Users:**

No action required! The app continues to work exactly as before. To enable AI features:

1. Deploy to Vercel (if not already there)
2. Add `OPENAI_API_KEY` environment variable
3. That's it! AI features activate automatically

**For New Users:**

Follow the [QUICKSTART.md](QUICKSTART.md) guide for a 5-minute setup.

---

## [1.0.0] - Previous Version

### Features

- Basic vinyl project calculator
- Material cost calculation
- Labor time estimation
- Overhead and profit margins
- PDF export
- Image export
- PWA functionality
- Offline support

---

## Future Roadmap

Potential features for future releases:

- [ ] Historical pricing data and trends
- [ ] Bulk quote generation
- [ ] Customer database integration
- [ ] Multiple material types beyond vinyl
- [ ] Advanced markup strategies
- [ ] Invoice generation
- [ ] Tax calculation by region
- [ ] Multi-currency support
- [ ] Team collaboration features
- [ ] Analytics dashboard

---

**Questions or feedback?** Open an issue on [GitHub](https://github.com/jmenichole/Maker-Estimater/issues)
