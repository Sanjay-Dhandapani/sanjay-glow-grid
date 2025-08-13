import { useEffect, useState } from 'react';
import { Zap, ZapOff, Minus } from 'lucide-react';
import { initMotion, setMotionSetting, getMotionSetting, type MotionSetting } from '../../lib/motion';

export default function PremiumMotionToggle() {
  const [currentMotion, setCurrentMotion] = useState<MotionSetting>('full');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initMotion();
    setCurrentMotion(getMotionSetting());
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleMotion = () => {
    const settings: MotionSetting[] = ['full', 'reduced', 'off'];
    const currentIndex = settings.indexOf(currentMotion);
    const nextSetting = settings[(currentIndex + 1) % settings.length];
    setMotionSetting(nextSetting);
    setCurrentMotion(nextSetting);
  };

  const getIcon = () => {
    switch (currentMotion) {
      case 'full':
        return <Zap className="w-4 h-4" />;
      case 'reduced':
        return <Minus className="w-4 h-4" />;
      case 'off':
        return <ZapOff className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    switch (currentMotion) {
      case 'full':
        return 'Full animations';
      case 'reduced':
        return 'Reduced animations';
      case 'off':
        return 'No animations';
    }
  };

  return (
    <button
      onClick={toggleMotion}
      className="cursor-target relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200 group"
      aria-label={`Motion setting: ${getLabel()}`}
      title={getLabel()}
    >
      <div className="relative">
        {getIcon()}
      </div>
    </button>
  );
}