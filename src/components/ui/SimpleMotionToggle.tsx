import { Zap, ZapOff } from 'lucide-react';

export default function SimpleMotionToggle() {
  return (
    <button 
      type="button"
      className="cursor-target inline-flex h-9 w-9 items-center justify-center rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 text-foreground hover:bg-card hover:border-border transition-all duration-300"
      aria-label="Toggle motion"
      id="motion-toggle"
    >
      <Zap className="h-4 w-4 transition-all" />
      <span className="sr-only">Toggle motion</span>
    </button>
  );
}
