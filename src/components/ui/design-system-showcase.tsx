import React from 'react';

interface DesignSystemShowcaseProps {
  className?: string;
}

export const DesignSystemShowcase: React.FC<DesignSystemShowcaseProps> = ({ className = '' }) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Premium Design System Header */}
      <section className="premium-section text-center">
        <div className="premium-container">
          <div className="quantum-particles neural-network p-12 rounded-3xl mb-12">
            <h1 className="signature-heading text-5xl md:text-7xl font-display mb-6">
              Sanjay Dhandapani
            </h1>
            <h2 className="holographic text-2xl md:text-3xl font-medium mb-4">
              Premium Design System
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A sophisticated visual identity featuring quantum teal, neural purple, electric magenta, 
              and cosmic gold - representing innovation, intelligence, creativity, and premium quality.
            </p>
          </div>
        </div>
      </section>

      {/* Design Token Showcase */}
      <section className="premium-section">
        <div className="premium-container">
          <h2 className="glow-text text-4xl font-display text-center mb-16">Design Tokens</h2>
          
          {/* Color System */}
          <div className="signature-card mb-16">
            <h3 className="text-2xl font-display mb-8">Premium Color Psychology</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Primary - Quantum Teal */}
              <div className="space-y-4">
                <div className="dynamic-border">
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary rounded-xl mx-auto mb-4 shadow-primary"></div>
                    <h4 className="font-semibold text-primary">Quantum Teal</h4>
                    <p className="text-sm text-muted-foreground">Innovation & Technical Mastery</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-primary rounded"></div>
                  <div className="h-8 bg-primary-muted rounded"></div>
                  <div className="h-8 bg-primary-subtle rounded"></div>
                </div>
              </div>

              {/* Secondary - Neural Purple */}
              <div className="space-y-4">
                <div className="glass-card-premium p-6 text-center">
                  <div className="w-16 h-16 bg-secondary rounded-xl mx-auto mb-4 shadow-secondary"></div>
                  <h4 className="font-semibold text-secondary">Neural Purple</h4>
                  <p className="text-sm text-muted-foreground">AI & Intelligence</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-secondary rounded"></div>
                  <div className="h-8 bg-secondary-muted rounded"></div>
                  <div className="h-8 bg-surface rounded"></div>
                </div>
              </div>

              {/* Accent - Electric Magenta */}
              <div className="space-y-4">
                <div className="glass-card-luxury p-6 text-center">
                  <div className="w-16 h-16 bg-accent rounded-xl mx-auto mb-4 shadow-accent"></div>
                  <h4 className="font-semibold text-accent">Electric Magenta</h4>
                  <p className="text-sm text-muted-foreground">Creativity & Innovation</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-accent rounded"></div>
                  <div className="h-8 bg-accent-muted rounded"></div>
                  <div className="h-8 bg-accent-subtle rounded"></div>
                </div>
              </div>

              {/* Tertiary - Cosmic Gold */}
              <div className="space-y-4">
                <div className="morphing-border p-6 text-center">
                  <div className="w-16 h-16 bg-tertiary rounded-xl mx-auto mb-4 shadow-lg"></div>
                  <h4 className="font-semibold text-tertiary">Cosmic Gold</h4>
                  <p className="text-sm text-muted-foreground">Premium & Achievement</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-8 bg-tertiary rounded"></div>
                  <div className="h-8 bg-tertiary-muted rounded"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography System */}
          <div className="glass-card p-12 mb-16">
            <h3 className="text-2xl font-display mb-8 gradient-text">Typography Hierarchy</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Display Font */}
              <div className="text-center">
                <h4 className="font-display text-3xl mb-4 text-primary">Playfair Display</h4>
                <p className="text-sm text-muted-foreground mb-6">Premium serif for headings & display</p>
                <div className="space-y-2 text-left">
                  <div className="font-display text-4xl">Heading 1</div>
                  <div className="font-display text-3xl">Heading 2</div>
                  <div className="font-display text-2xl">Heading 3</div>
                  <div className="font-display text-xl">Heading 4</div>
                </div>
              </div>

              {/* Sans Font */}
              <div className="text-center">
                <h4 className="font-sans text-3xl mb-4 text-secondary">Inter</h4>
                <p className="text-sm text-muted-foreground mb-6">Modern sans-serif for body text</p>
                <div className="space-y-2 text-left">
                  <div className="text-lg font-semibold">Large Text</div>
                  <div className="text-base">Body Text</div>
                  <div className="text-sm">Small Text</div>
                  <div className="text-xs">Caption Text</div>
                </div>
              </div>

              {/* Mono Font */}
              <div className="text-center">
                <h4 className="font-mono text-3xl mb-4 text-accent">JetBrains Mono</h4>
                <p className="text-sm text-muted-foreground mb-6">Technical monospace for code</p>
                <div className="space-y-2 text-left">
                  <div className="font-mono text-lg">const code = true;</div>
                  <div className="font-mono text-base">function example() {}</div>
                  <div className="font-mono text-sm">// Comment style</div>
                  <div className="font-mono text-xs">console.log("Hello");</div>
                </div>
              </div>
            </div>
          </div>

          {/* Glass Morphism Variants */}
          <div className="mb-16">
            <h3 className="text-2xl font-display text-center mb-8">Glass Morphism System</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="glass-card p-8">
                <div className="status-online w-12 h-12 bg-primary/20 rounded-full mb-4"></div>
                <h4 className="font-semibold mb-2">Standard Glass</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  16px blur with 180% saturation and subtle border highlights
                </p>
                <div className="skeleton-loader h-2 w-full"></div>
              </div>

              <div className="glass-card-premium p-8">
                <div className="energy-field w-12 h-12 mb-4"></div>
                <h4 className="font-semibold mb-2">Premium Glass</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Enhanced blur with gradient borders and premium depth
                </p>
                <button className="quantum-button text-sm px-4 py-2">
                  Quantum Button
                </button>
              </div>

              <div className="glass-card-luxury p-8">
                <div className="neural-network w-12 h-12 rounded-lg mb-4"></div>
                <h4 className="font-semibold mb-2">Luxury Glass</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Maximum sophistication with contrast enhancement
                </p>
                <div className="neon-border p-3 text-center">
                  <span className="text-sm">Neon Border</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="signature-card p-12 mb-16">
            <h3 className="text-2xl font-display mb-8">Interactive Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <button className="liquid-button p-4 rounded-xl">
                <span>Liquid Button</span>
              </button>
              
              <div className="magnetic-hover shimmer p-4 bg-surface rounded-xl text-center">
                <span className="text-sm font-medium">Magnetic + Shimmer</span>
              </div>
              
              <div 
                className="premium-tooltip hover-lift p-4 bg-card border border-border rounded-xl text-center cursor-pointer focus-enhanced"
                data-tooltip="Premium tooltip with blur backdrop"
                tabIndex={0}
              >
                <span className="text-sm">Hover Me</span>
              </div>
              
              <div className="perspective-card p-4 bg-gradient-mesh rounded-xl text-center">
                <span className="text-sm font-medium">3D Perspective</span>
              </div>
            </div>
          </div>

          {/* Animation Showcase */}
          <div className="glass-card p-12 mb-16">
            <h3 className="text-2xl font-display text-center mb-8">Premium Animations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
              
              <div className="text-center">
                <div className="float w-16 h-16 bg-gradient-primary rounded-2xl mb-2"></div>
                <span className="text-xs text-muted-foreground">Float</span>
              </div>
              
              <div className="text-center">
                <div className="breathing w-16 h-16 bg-gradient-secondary rounded-2xl mb-2"></div>
                <span className="text-xs text-muted-foreground">Breathing</span>
              </div>
              
              <div className="text-center">
                <div className="pulse-glow w-16 h-16 bg-gradient-tertiary rounded-2xl mb-2"></div>
                <span className="text-xs text-muted-foreground">Pulse Glow</span>
              </div>
              
              <div className="text-center">
                <div className="liquid-morph w-16 h-16 bg-gradient-conic mb-2"></div>
                <span className="text-xs text-muted-foreground">Liquid Morph</span>
              </div>
              
              <div className="text-center">
                <div className="quantum-grid w-16 h-16 rounded-2xl mb-2"></div>
                <span className="text-xs text-muted-foreground">Quantum Grid</span>
              </div>
              
              <div className="text-center">
                <div className="shimmer w-16 h-16 bg-surface rounded-2xl mb-2"></div>
                <span className="text-xs text-muted-foreground">Shimmer</span>
              </div>
            </div>
          </div>

          {/* Brand Identity */}
          <div className="text-center">
            <div className="quantum-particles p-16 rounded-3xl">
              <h2 className="holographic text-4xl font-display mb-6">
                Distinctive Brand Identity
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                This premium design system creates a memorable visual identity that stands out from 
                typical blue portfolios. Every element is crafted to convey technical expertise, 
                creativity, and premium quality while maintaining perfect accessibility and usability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress fixed top-0 left-0 w-full z-50">
        <div className="scroll-progress-bar" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};

export default DesignSystemShowcase;