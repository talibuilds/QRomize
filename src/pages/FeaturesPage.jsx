import React, { useEffect, useRef } from 'react';
import { Palette, Shield, Layout, Settings2 } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { textToImage } from '../utils/textToImage';
import './FeaturesPage.css';

const CustomQR = ({ options }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 260,
      height: 260,
      data: "https://qromize.com",
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5
      },
      backgroundOptions: {
        color: "#ffffff"
      },
      ...options
    });
    
    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.append(ref.current);
    }
  }, [options]);

  return <div ref={ref} className="live-qr-render" />;
};

function FeaturesPage() {
  const sample1Options = {
    dotsOptions: { color: "#000000", type: "rounded" },
    cornersSquareOptions: { color: "#000000", type: "extra-rounded" },
    cornersDotOptions: { color: "#2525e6", type: "dot" }, // Blue center
    image: "/cool-logo.png"
  };

  const sample2Options = {
    dotsOptions: { color: "#b31b1b", type: "classy" }, // Red dots
    cornersSquareOptions: { color: "#555555", type: "extra-rounded" }, // Grey outer
    cornersDotOptions: { color: "#d32f2f", type: "dot" }, // Red inner
    image: "/cool-logo.png"
  };

  const sample3Options = {
    dotsOptions: { color: "#114211", type: "classy-rounded" }, // Dark green dots
    cornersSquareOptions: { color: "#e53935", type: "square" }, // Red outer square
    cornersDotOptions: { color: "#4e1a1a", type: "square" }, // Dark brown inner square
    image: textToImage("ABC", "#ffffff", "#111111")
  };

  return (
    <div className="features-page">
      <div className="fp-header">
        <h1>Discover What's Possible</h1>
        <p>Explore the endless customization capabilities of QRomize. See real examples of what you can build.</p>
      </div>

      <section className="zigzag-section">
        {/* Sample 1 */}
        <div className="feature-row">
          <div className="feature-image-container">
            <div className="real-mock-qr">
              <CustomQR options={sample1Options} />
            </div>
          </div>
          <div className="feature-text">
            <h2>Brand Integration</h2>
            <p>Seamlessly integrate your company logo into the center of any QR code. Combine it with contrasting marker colors to make your branding stand out while maintaining perfect scannability.</p>
          </div>
        </div>

        {/* Sample 2 */}
        <div className="feature-row reverse">
          <div className="feature-image-container">
            <div className="real-mock-qr">
               <CustomQR options={sample2Options} />
            </div>
          </div>
          <div className="feature-text">
            <h2>Abstract Art & Colors</h2>
            <p>Use abstract SVG icons and custom color palettes to make your codes pop. Move away from standard black and white to match your brand's unique aesthetic.</p>
          </div>
        </div>

        {/* Sample 3 */}
        <div className="feature-row">
          <div className="feature-image-container">
            <div className="real-mock-qr">
               <CustomQR options={sample3Options} />
            </div>
          </div>
          <div className="feature-text">
            <h2>Embedded Text & Initials</h2>
            <p>No logo? No problem. Convert text, initials (like "ABC"), or emojis directly into central icons instantly without needing external image editors.</p>
          </div>
        </div>
      </section>

      <section className="tech-specs-section" style={{ marginTop: '6rem' }}>
         <h2 className="section-title" style={{ textAlign: 'center', borderLeft: 'none', marginBottom: '4rem' }}>Why We Are Different</h2>
         <div className="specs-grid">
            <div className="spec-card">
              <Palette size={32} className="spec-icon" />
              <h4>Infinite Theming</h4>
              <p>Every single element of your QR code, from the outer markers to the inner dots, can be assigned a custom color.</p>
            </div>
            <div className="spec-card">
              <Layout size={32} className="spec-icon" />
              <h4>Dynamic Formats</h4>
              <p>Export in highly scalable SVG for print, or standardized PNG for quick digital sharing.</p>
            </div>
            <div className="spec-card">
              <Shield size={32} className="spec-icon" />
              <h4>Error Correction</h4>
              <p>We automatically calculate optimal error correction levels so your logo never interferes with scannability.</p>
            </div>
            <div className="spec-card">
              <Settings2 size={32} className="spec-icon" />
              <h4>Real-time Rendering</h4>
              <p>Experience zero lag as you adjust styling sliders. See your changes instantly before you download.</p>
            </div>
         </div>
      </section>
    </div>
  );
}

export default FeaturesPage;
