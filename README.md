# Color Difference Audio Judge

An accessible web application that helps blind and visually impaired individuals understand and compare colors through audio descriptions and detailed analysis.

## 🎯 Purpose

This tool bridges the gap between visual color information and auditory understanding, making color comparison accessible to everyone. It converts visual color data into meaningful audio descriptions and quantitative measurements.

## ✨ Features

### Audio Descriptions
- **Text-to-Speech Integration**: Speaks detailed color analysis with a single button click
- **Comprehensive Color Naming**: Identifies colors by common names (Red, Blue, Green, etc.)
- **Brightness Levels**: Describes colors from "very dark" to "very light"
- **Saturation Description**: Explains color intensity from "muted" to "highly saturated"

### Color Analysis
- **Side-by-Side Comparison**: Compare two colors simultaneously
- **Multiple Metrics**:
  - Hue difference (color type variation)
  - Brightness difference (lightness variation)
  - Saturation difference (intensity variation)
  - Overall similarity rating
- **Real-time Updates**: Analysis updates instantly as colors change

### Accessibility
- **Screen Reader Compatible**: Proper ARIA labels and semantic HTML
- **High Contrast Interface**: Dark theme with clear visual hierarchy
- **Large Interactive Elements**: Easy-to-use color pickers and buttons
- **Keyboard Navigation**: Full keyboard accessibility support

## 🚀 Demo

[Live Demo](#) *(Add your deployment URL here)*

## 📸 Screenshots

![Color Difference Judge Interface](screenshot.png)

## 🛠️ Technology Stack

- **React** - UI framework
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling
- **Web Speech API** - Text-to-speech functionality

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/color-difference-judge.git
cd color-difference-judge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎮 Usage

1. **Select Colors**: Use the color pickers or enter hex codes manually
2. **View Analysis**: Read the detailed comparison in the results section
3. **Listen to Description**: Click the "Speak Analysis" button to hear the audio description
4. **Compare**: Adjust colors to understand different color relationships

### Example Use Cases

- **Fashion & Clothing**: Understand if two clothing items match
- **Design Work**: Ensure color combinations meet accessibility standards
- **Education**: Learn about color relationships and differences
- **Daily Tasks**: Identify and compare colors in everyday situations

## 🔍 How It Works

The application uses color science principles to analyze colors:

1. **Color Conversion**: Converts hex codes to RGB, then to HSL (Hue, Saturation, Lightness)
2. **Color Classification**: Maps hue values to common color names
3. **Brightness Analysis**: Evaluates lightness levels
4. **Saturation Analysis**: Determines color intensity
5. **Difference Calculation**: Computes mathematical differences between colors
6. **Audio Generation**: Synthesizes natural language descriptions using Web Speech API

### Color Metrics Explained

- **Hue Difference (0-180°)**: How different the base colors are
- **Brightness Difference (0-100%)**: How much lighter or darker one color is
- **Saturation Difference (0-100%)**: How much more or less intense the colors are
- **Color Distance**: Overall mathematical difference in RGB space

## 🌐 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

**Note**: Text-to-speech functionality requires browser support for the Web Speech API.

## ♿ Accessibility Features

- ARIA labels for all interactive elements
- Semantic HTML structure
- High contrast color scheme (WCAG AA compliant)
- Keyboard navigation support
- Screen reader tested
- Focus indicators for all interactive elements

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution

- Additional language support for audio descriptions
- More detailed color naming (e.g., "crimson" vs "red")
- Color blindness simulation modes
- Export/save color comparisons
- Batch color comparison
- Mobile app version

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for accessible color tools
- Built with accessibility-first principles
- Thanks to the Web Speech API for enabling audio descriptions

## 📧 Contact

Om Gedam

GitHub: @itsomg134

Email: omgedam123098@gmail.com

Twitter (X): @omgedam

LinkedIn: Om Gedam

Portfolio: https://ogworks.lovable.app


## 🗺️ Roadmap

- [ ] Add color palette comparison (multiple colors)
- [ ] Implement color history/favorites
- [ ] Add contrast ratio checker (WCAG compliance)
- [ ] Support for color blindness filters
- [ ] Multi-language audio support
- [ ] Mobile-responsive improvements
- [ ] Offline PWA support
- [ ] Color difference heat map visualization

## 💡 Tips for Users

- Use headphones for better audio clarity
- Start with highly contrasting colors to understand the tool
- Experiment with similar colors to learn subtle differences
- Adjust your browser's speech settings for preferred voice and speed
