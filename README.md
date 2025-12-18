# Vinyl Project Calculator

A Progressive Web App (PWA) designed to help craft makers calculate accurate price quotes for vinyl projects, powered by AI for intelligent pricing estimates.

**🚀 [Quick Start Guide →](QUICKSTART.md)** | **📖 [Setup Instructions →](SETUP.md)** | **🚢 [Deployment Guide →](DEPLOYMENT.md)**

## Features

- 🤖 **AI-Powered Pricing** - Uses Vercel AI Gateway with OpenAI to generate accurate estimates
- 🌍 **Location-Aware** - Automatically adjusts pricing based on regional cost of living
- 📱 Install as a mobile app
- 🔢 Calculate project costs instantly
- 💰 Includes material, labor, overhead, and profit calculations
- 📊 AI-generated recommendations and insights
- 📴 Works offline with fallback calculations
- 🎨 Clean, user-friendly interface

## Demo

Access the live calculator: [Your GitHub Pages URL]

## Installation

### Mobile Users
1. Visit the calculator website on your mobile device
2. Tap your browser's menu button
3. Select "Add to Home Screen"
4. Choose a name and tap "Add"

### Desktop Users
1. Visit the calculator website
2. Click the install icon in your browser's address bar
3. Follow the prompts to install

## Usage

1. Select your vinyl type (Premium, Removable, Holographic, Glitter, or Iron-On)
2. Enter project dimensions (width x height in inches)
3. Set quantity of pieces
4. Adjust labor rate (default: $25/hour)
5. Check options for complex weeding or rush orders
6. Click "Calculate Quote" to get your AI-powered estimate

### AI-Powered Features

The calculator uses artificial intelligence to provide:

- **Accurate Material Calculations**: AI analyzes waste factors and material efficiency
- **Intelligent Labor Estimates**: Considers complexity, size, and weeding requirements
- **Location-Based Pricing**: Automatically adjusts for regional cost of living
- **Smart Recommendations**: Get tips on pricing strategy and material optimization
- **Market Analysis**: AI considers current market rates and industry standards

### Quote Breakdown

Your estimate includes:
- Material cost (with waste factor)
- Labor cost (time-based)
- Setup fee ($5 standard)
- Overhead (15% for equipment, utilities, packaging)
- Profit margin (20% industry standard)
- Rush fee (25% surcharge if applicable)
- Regional pricing adjustment
- AI-generated insights and recommendations

## Project Structure

```
vinyl-project-calculator/
├── index.html
├── manifest.json
├── sw.js
├── icon-192.png
└── icon-512.png
```

## Technical Details

- Built with vanilla JavaScript
- Implements PWA standards
- Uses service workers for offline functionality
- Responsive design with CSS
- **Vercel AI Gateway** integration for intelligent pricing
- **OpenAI GPT-4o-mini** for cost estimation and recommendations
- Serverless API functions on Vercel
- Location detection using Vercel geolocation headers
- Fallback calculations for offline/error scenarios

## Customization

### Modifying Profit Margins
Edit the `calculate()` function in `index.html`:
```javascript
const overhead = (materialCost + laborCost) * 0.1; // Change 0.1 for different overhead %
const profit = (materialCost + laborCost + overhead) * 0.2; // Change 0.2 for different profit %
```

### Changing Colors
Update the following files:
- `index.html`: Edit the CSS variables
- `manifest.json`: Modify theme_color and background_color

## Setup & Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Required: OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: OpenAI Base URL (for AI Gateway)
OPENAI_BASE_URL=https://gateway.vercel.com/v1/openai
```

**Getting an OpenAI API Key:**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new secret key
5. Add it to your `.env` file

**Setting up Vercel AI Gateway (Optional):**
1. Log in to [Vercel](https://vercel.com)
2. Navigate to your project settings
3. Add environment variables in the Vercel dashboard
4. The gateway provides caching, analytics, and rate limiting

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `OPENAI_API_KEY`
   - Optionally add `OPENAI_BASE_URL`

## Development

1. Clone the repository:
```bash
git clone https://github.com/jmenichole/Maker-Estimater.git
cd Maker-Estimater
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your API keys (see Setup section above)

4. Run locally with Vercel dev server:
```bash
npm run dev
# or
vercel dev
```

5. Test the application at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use and modify for your needs.

## Support

- Open an issue for bugs
- Submit feature requests through issues
- Pull requests welcome

## Credits

Created by [Your Name]
- GitHub: [@yourusername]
- Website: [your website]

## Version History

- 1.0.0: Initial release
  - Basic calculator functionality
  - PWA implementation
  - Offline support

---

Made with ❤️ for the crafting community
