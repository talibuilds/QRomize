import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Upload, Image as ImageIcon, Type, Settings2, Palette as PaletteIcon, Link as LinkIcon, Trash2, Shield, Zap, Layout } from 'lucide-react';
import { textToImage } from '../utils/textToImage';

function Home() {
  const [data, setData] = useState("https://example.com");
  const [dotsColor, setDotsColor] = useState("#000000");
  const [dotsType, setDotsType] = useState("rounded");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [cornersSquareColor, setCornersSquareColor] = useState("#000000");
  const [cornersSquareType, setCornersSquareType] = useState("extra-rounded");
  const [cornersDotColor, setCornersDotColor] = useState("#000000");
  const [cornersDotType, setCornersDotType] = useState("dot");
  
  const [logoType, setLogoType] = useState("image"); // Default to image
  const [logoImage, setLogoImage] = useState("/cool-logo.png"); // Default standard cool logo inside QR
  const [logoText, setLogoText] = useState("");
  const [logoTextColor, setLogoTextColor] = useState("#ffffff");
  const [logoBgColor, setLogoBgColor] = useState("#c5a059");

  const [activeTab, setActiveTab] = useState("content"); 

  const qrRef = useRef(null);
  const qrCodeInstance = useRef(null);

  // Initialize QR Code Styling instance once
  useEffect(() => {
    qrCodeInstance.current = new QRCodeStyling({
      width: 300,
      height: 300,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5
      }
    });

    if (qrRef.current) {
      qrCodeInstance.current.append(qrRef.current);
    }
  }, []);

  // Update QR Code
  useEffect(() => {
    let currentImage = undefined;
    
    if (logoType === "image" && logoImage) {
      currentImage = logoImage;
    } else if (logoType === "text" && logoText) {
      currentImage = textToImage(logoText, logoTextColor, logoBgColor);
    }

    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data: data || " ",
        dotsOptions: { color: dotsColor, type: dotsType },
        backgroundOptions: { color: bgColor },
        cornersSquareOptions: { color: cornersSquareColor, type: cornersSquareType },
        cornersDotOptions: { color: cornersDotColor, type: cornersDotType },
        image: currentImage
      });
    }
  }, [
    data, dotsColor, dotsType, bgColor, cornersSquareColor, cornersSquareType, 
    cornersDotColor, cornersDotType, logoType, logoImage, logoText, logoTextColor, logoBgColor
  ]);

  const onDownloadClick = (extension) => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download({ extension: extension });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoImage(reader.result);
        setLogoType("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoImage(null);
    setLogoText("");
    setLogoType("none");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow">THE QR CODE, REINVENTED</div>
        <h1>
          Your brand.<br />
          <span className="strikethrough">A boring</span> <span className="highlight-text">scannable</span><br />
          masterpiece.
        </h1>
        <p>
          Stop handing people <span className="highlight-text">plain black squares</span>. QRomize turns every 
          scan into a branded moment — your colors, your logo, your 
          identity. Perfectly encoded.
        </p>
        
        <div className="hero-divider"></div>
        
        <div className="hero-pills">
          <span className="pill">CUSTOM COLORS</span>
          <span className="pill">LOGO EMBED</span>
          <span className="pill">ALWAYS SCANNABLE</span>
          <span className="pill">DOWNLOAD READY</span>
        </div>
      </section>

      <div className="app-container" id="generator">
        <main className="main-content">
          <section className="preview-section">
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div className="qr-wrapper" ref={qrRef} />
              <div className="action-buttons">
                <button className="btn btn-primary" onClick={() => onDownloadClick("png")}>
                  <Download size={18} /> PNG
                </button>
                <button className="btn btn-secondary" onClick={() => onDownloadClick("svg")}>
                  <Download size={18} /> SVG
                </button>
              </div>
            </div>
          </section>

          <section className="controls-section glass-panel">
            <div className="tabs">
              <button className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
                <LinkIcon size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> Content
              </button>
              <button className={`tab-btn ${activeTab === 'colors' ? 'active' : ''}`} onClick={() => setActiveTab('colors')}>
                <PaletteIcon size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> Colors
              </button>
              <button className={`tab-btn ${activeTab === 'style' ? 'active' : ''}`} onClick={() => setActiveTab('style')}>
                <Settings2 size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> Style
              </button>
              <button className={`tab-btn ${activeTab === 'logo' ? 'active' : ''}`} onClick={() => setActiveTab('logo')}>
                <ImageIcon size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> Logo
              </button>
            </div>

            {/* Controls Content */}
            {activeTab === 'content' && (
              <div className="control-group">
                <label><LinkIcon size={16} /> URL or Text</label>
                <textarea 
                  className="input-field" 
                  rows="4"
                  value={data} 
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Enter URL or text to encode..."
                />
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="color-pickers">
                <div className="control-group">
                  <label>Pattern Color</label>
                  <div className="color-picker-wrapper">
                    <input type="color" className="color-input" value={dotsColor} onChange={(e) => setDotsColor(e.target.value)} />
                    <span className="color-hex">{dotsColor}</span>
                  </div>
                </div>
                <div className="control-group">
                  <label>Background</label>
                  <div className="color-picker-wrapper">
                    <input type="color" className="color-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                    <span className="color-hex">{bgColor}</span>
                  </div>
                </div>
                <div className="control-group">
                  <label>Marker Border</label>
                  <div className="color-picker-wrapper">
                    <input type="color" className="color-input" value={cornersSquareColor} onChange={(e) => setCornersSquareColor(e.target.value)} />
                    <span className="color-hex">{cornersSquareColor}</span>
                  </div>
                </div>
                <div className="control-group">
                  <label>Marker Center</label>
                  <div className="color-picker-wrapper">
                    <input type="color" className="color-input" value={cornersDotColor} onChange={(e) => setCornersDotColor(e.target.value)} />
                    <span className="color-hex">{cornersDotColor}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'style' && (
              <>
                <div className="control-group">
                  <label>Pattern Style</label>
                  <select className="input-field select-field" value={dotsType} onChange={(e) => setDotsType(e.target.value)}>
                    <option value="rounded">Rounded</option>
                    <option value="dots">Dots</option>
                    <option value="classy">Classy</option>
                    <option value="classy-rounded">Classy Rounded</option>
                    <option value="square">Square</option>
                    <option value="extra-rounded">Extra Rounded</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>Marker Border Style</label>
                  <select className="input-field select-field" value={cornersSquareType} onChange={(e) => setCornersSquareType(e.target.value)}>
                    <option value="extra-rounded">Extra Rounded</option>
                    <option value="square">Square</option>
                    <option value="dot">Dot</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>Marker Center Style</label>
                  <select className="input-field select-field" value={cornersDotType} onChange={(e) => setCornersDotType(e.target.value)}>
                    <option value="dot">Dot</option>
                    <option value="square">Square</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 'logo' && (
              <>
                <div className="tabs" style={{ marginBottom: '1rem', borderBottom: 'none' }}>
                  <button 
                    className={`tab-btn ${logoType === 'image' ? 'active' : ''}`} 
                    onClick={() => setLogoType('image')}
                    style={{ fontSize: '0.9rem' }}
                  >
                    Image Logo
                  </button>
                  <button 
                    className={`tab-btn ${logoType === 'text' ? 'active' : ''}`} 
                    onClick={() => setLogoType('text')}
                    style={{ fontSize: '0.9rem' }}
                  >
                    Text Logo
                  </button>
                </div>

                {logoType === 'image' && (
                  <div className="control-group">
                    <label>Upload Image</label>
                    <label className="file-upload">
                      <Upload size={18} />
                      <span>Choose an image...</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </label>
                    {logoImage && (
                      <div className="logo-preview">
                        <img src={logoImage} alt="Logo preview" />
                        <button className="remove-btn" onClick={removeLogo} title="Remove Logo">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {logoType === 'text' && (
                  <>
                    <div className="control-group">
                      <label><Type size={16} /> Text to Embed</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={logoText} 
                        onChange={(e) => setLogoText(e.target.value)}
                        placeholder="e.g. A, JS, ⚡"
                        maxLength="10"
                      />
                    </div>
                    <div className="color-pickers" style={{ marginTop: '0.5rem' }}>
                      <div className="control-group">
                        <label>Text Color</label>
                        <div className="color-picker-wrapper">
                          <input type="color" className="color-input" value={logoTextColor} onChange={(e) => setLogoTextColor(e.target.value)} />
                          <span className="color-hex">{logoTextColor}</span>
                        </div>
                      </div>
                      <div className="control-group">
                        <label>Background</label>
                        <div className="color-picker-wrapper">
                          <input type="color" className="color-input" value={logoBgColor} onChange={(e) => setLogoBgColor(e.target.value)} />
                          <span className="color-hex">{logoBgColor}</span>
                        </div>
                      </div>
                    </div>
                    {logoText && (
                      <div className="logo-preview" style={{ marginTop: '1rem', justifyContent: 'flex-end' }}>
                        <button className="remove-btn" onClick={removeLogo} title="Remove Text Logo">
                          <Trash2 size={16} /> Clear Text
                        </button>
                      </div>
                    )}
                  </>
                )}

                {logoType === 'none' && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    <ImageIcon size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>Select a logo type above to add a logo to the center of your QR code.</p>
                  </div>
                )}
              </>
            )}

          </section>
        </main>
      </div>

      <section id="features" className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>Why Choose QRomize?</h2>
            <p>Everything you need to create professional QR codes in seconds.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Layout size={30} /></div>
              <h3>Dynamic Patterns</h3>
              <p>Choose from multiple dot styles and corner types to make your QR code truly unique.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><PaletteIcon size={30} /></div>
              <h3>Infinite Colors</h3>
              <p>Customize the foreground, background, and marker colors to match your brand exactly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Shield size={30} /></div>
              <h3>Scannable & Reliable</h3>
              <p>High error-correction algorithms ensure your QR codes scan perfectly every time, even with logos.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Zap size={30} /></div>
              <h3>Instant Generation</h3>
              <p>Watch your QR code update in real-time as you tweak the designs. No waiting required.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
