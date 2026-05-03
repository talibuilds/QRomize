<div align="center">
  <img src="public/logo-1.png" alt="QRomize Logo" width="120" />
  <h1>QRomize</h1>
  <p><strong>Your brand. A scannable masterpiece.</strong></p>
  <p>Stop handing people plain black squares. The QR code, reinvented.</p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  </p>
</div>

---

<div align="center">
  <img src="src/assets/hero.png" alt="QRomize App Interface" width="800" />
</div>

## ✨ Features

QRomize takes the generic QR code and transforms it into a premium, brand-authentic experience.

*   🎨 **Infinite Theming**: Customize the foreground, background, and specific marker colors (eyes and dots) to match your brand's unique color palette flawlessly.
*   ⚡ **Real-Time Rendering**: Zero lag. Experience instant visual feedback as you adjust styling sliders, colors, and logos.
*   🏢 **Brand Integration (Logo Upload)**: Seamlessly embed your company logo into the center of the QR code with automatic error-correction adjustment to ensure 100% scannability.
*   🔤 **Embedded Text & Emojis**: No logo? No problem. Convert initials (e.g., "ABC"), text, or emojis directly into a high-quality central avatar on the fly without needing any external image editors.
*   🕸️ **Interactive Canvas**: Enjoy a sleek, premium UI featuring an interactive, mouse-reactive "spidernet" particle background.
*   📦 **Dynamic Formats**: Export your masterpiece in highly scalable SVG for print, or standardized PNG for quick digital sharing.

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/talibuilds/QRomize.git
   cd QRomize
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to see the application in action.

## 🛠️ Technology Stack

*   **Framework**: [React.js](https://reactjs.org/) powered by [Vite](https://vitejs.dev/) for lightning-fast HMR.
*   **Routing**: `react-router-dom` for seamless multi-page navigation (Home & Features Gallery).
*   **QR Engine**: `qr-code-styling` for high-quality, fully customizable QR code generation directly on the HTML5 Canvas.
*   **Icons**: `lucide-react` for beautiful, consistent iconography.
*   **Design System**: Custom Vanilla CSS leveraging CSS variables, dark mode scoping, and a highly responsive flex/grid layout.

## 🎨 Design Aesthetic

The QRomize UI is built around a "Premium Dark & Gold" aesthetic (`#000000` & `#c5a059`). The application features:
*   A fully custom, dependency-free interactive HTML5 Canvas background (`SpiderNetBg.jsx`).
*   Smooth animations, deep royal/slate high-contrast typography, and premium shadows.
*   A responsive "Zigzag" feature gallery powered by live `QRCodeStyling` rendering components.

## 📂 Project Structure

```text
QRomize/
├── public/                # Static assets (logos, standard icons)
├── src/
│   ├── assets/            # App-specific images (hero)
│   ├── components/        # Reusable UI components (e.g., SpiderNetBg)
│   ├── pages/             # Page routes (Home, FeaturesPage)
│   ├── utils/             # Utility scripts (e.g., textToImage generator)
│   ├── App.jsx            # Main application router and layout
│   ├── index.css          # Global design system & theme variables
│   └── main.jsx           # React entry point
└── package.json           # Dependencies and scripts
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/talibuilds/QRomize/issues) if you want to contribute.

## 👨‍💻 Author

Built with ❤️ by **[talibuilds](https://github.com/talibuilds)**.
