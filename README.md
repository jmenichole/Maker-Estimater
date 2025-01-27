# Vinyl Project Calculator

A Progressive Web App (PWA) designed to help craft makers calculate accurate price quotes for vinyl projects.

## Features

- 📱 Install as a mobile app
- 🔢 Calculate project costs instantly
- 💰 Includes material, labor, overhead, and profit calculations
- 📴 Works offline
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

1. Enter your material costs
2. Input project size in square inches
3. Estimate time required in minutes
4. Set your desired hourly rate
5. Click "Calculate Total" for a complete breakdown

The calculator will provide:
- Material cost
- Labor cost
- Overhead (10%)
- Profit margin (20%)
- Total project quote

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

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vinyl-project-calculator.git
```

2. Make your changes

3. Test locally using a local server:
```bash
python -m http.server 8000
```

4. Deploy to GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select main branch
   - Save

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
