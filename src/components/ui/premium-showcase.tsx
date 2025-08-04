import React from 'react';
import { Card } from './card';

interface PremiumShowcaseProps {
  className?: string;
}

export const PremiumShowcase: React.FC<PremiumShowcaseProps> = ({ className = '' }) => {
  return (
    <div className={`premium-section ${className}`}>
      <div className="premium-container">
        {/* Hero Section with Signature Typography */}
        <div className="text-center mb-16">
          <h1 className="signature-heading text-6xl md:text-8xl font-display mb-6">
            Sanjay Dhandapani
          </h1>
          <p className="holographic text-xl md:text-2xl font-medium mb-8">
            Premium Portfolio Design System
          </p>
          <div className="quantum-particles w-full h-32 mb-8"></div>
        </div>

        {/* Premium Glass Cards Grid */}
        <div className="premium-grid mb-16">
          {/* Standard Glass Card */}
          <Card className="glass-card p-8">
            <div className="space-y-4">
              <div className="status-online w-16 h-16 bg-primary/20 rounded-full"></div>
              <h3 className="text-xl font-semibold text-foreground">Standard Glass</h3>
              <p className="text-muted-foreground">
                Enhanced backdrop blur with premium shadow system
              </p>
              <div className="skeleton-loader h-2 w-3/4"></div>
            </div>
          </Card>

          {/* Premium Glass Card */}
          <Card className="glass-card-premium p-8">
            <div className="space-y-4">
              <div className="energy-field w-16 h-16"></div>
              <h3 className="text-xl font-semibold text-foreground">Premium Glass</h3>
              <p className="text-muted-foreground">
                Advanced glass morphism with gradient borders
              </p>
              <button className="quantum-button text-sm">
                Quantum Action
              </button>
            </div>
          </Card>

          {/* Luxury Glass Card */}
          <Card className="glass-card-luxury p-8">
            <div className="space-y-4">
              <div className="neural-network w-16 h-16 rounded-lg"></div>
              <h3 className="text-xl font-semibold text-foreground">Luxury Glass</h3>
              <p className="text-muted-foreground">
                Maximum sophistication with multi-layer effects
              </p>
              <div className="dynamic-border rounded-lg">
                <div className="p-3">
                  <span className="text-sm font-medium">Dynamic Border</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Signature Components Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Quantum Grid */}
          <div className="quantum-grid h-48 rounded-2xl flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">Quantum Grid</span>
          </div>

          {/* Signature Card */}
          <div className="signature-card">
            <h4 className="text-lg font-semibold mb-2">Signature Card</h4>
            <p className="text-sm text-muted-foreground">
              Rotating conic gradient background with premium interactions
            </p>
          </div>

          {/* Interactive Elements */}
          <div className="space-y-4">
            <button 
              className="premium-tooltip w-full p-4 bg-surface hover:bg-surface-hover rounded-lg transition-colors focus-enhanced"
              data-tooltip="Premium tooltip with backdrop blur"
            >
              Hover for Tooltip
            </button>
            
            <div className="magnetic-hover shimmer p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <span className="text-sm font-medium">Magnetic + Shimmer</span>
            </div>
          </div>
        </div>

        {/* Typography Showcase */}
        <div className="text-center mb-16">
          <h2 className="glow-text text-4xl font-display mb-8">Typography System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-2xl mb-4 text-primary">Playfair Display</h3>
              <p className="text-sm text-muted-foreground">Premium serif for headings</p>
            </div>
            <div>
              <h3 className="font-sans text-2xl mb-4 text-secondary">Inter</h3>
              <p className="text-sm text-muted-foreground">Clean sans-serif for body</p>
            </div>
            <div>
              <h3 className="font-mono text-2xl mb-4 text-accent">JetBrains Mono</h3>
              <p className="text-sm text-muted-foreground">Technical monospace</p>
            </div>
          </div>
        </div>

        {/* Color Palette Display */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-center mb-8">Premium Color System</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-full h-24 bg-primary rounded-lg mb-3 shadow-primary"></div>
              <p className="text-sm font-medium">Quantum Teal</p>
              <p className="text-xs text-muted-foreground">Innovation & Mastery</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-secondary rounded-lg mb-3 shadow-secondary"></div>
              <p className="text-sm font-medium">Neural Purple</p>
              <p className="text-xs text-muted-foreground">AI & Intelligence</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-accent rounded-lg mb-3 shadow-accent"></div>
              <p className="text-sm font-medium">Electric Magenta</p>
              <p className="text-xs text-muted-foreground">Creativity & Innovation</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-tertiary rounded-lg mb-3 shadow-lg"></div>
              <p className="text-sm font-medium">Cosmic Gold</p>
              <p className="text-xs text-muted-foreground">Premium & Achievement</p>
            </div>
          </div>
        </div>

        {/* Animation Showcase */}
        <div className="text-center">
          <h2 className="text-3xl font-display mb-8">Premium Animations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="float w-20 h-20 bg-gradient-primary rounded-full"></div>
            <div className="breathing w-20 h-20 bg-gradient-secondary rounded-full"></div>
            <div className="pulse-glow w-20 h-20 bg-gradient-tertiary rounded-full"></div>
            <div className="liquid-morph w-20 h-20 bg-gradient-conic"></div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
};

export default PremiumShowcase;