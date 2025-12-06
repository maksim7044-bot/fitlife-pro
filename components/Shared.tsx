
import React from 'react';
import { ChevronRight, Zap, Award, Check } from 'lucide-react';
import { hapticFeedback } from '../utils/telegram';

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  const handleClick = () => {
    if (onClick) {
        hapticFeedback('light');
        onClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-100 ${onClick ? 'active:scale-95 transition-transform cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  ...props 
}) => {
  const baseStyle = "w-full py-3 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-500 text-white shadow-lg shadow-blue-500/30",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-50",
    danger: "bg-red-50 text-red-500 hover:bg-red-100",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      hapticFeedback('medium');
      onClick?.(e);
  }

  return (
    <button onClick={handleClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const ProgressBar: React.FC<{ current: number; max: number; color?: string; label?: string }> = ({ current, max, color = "bg-blue-500", label }) => {
  const percent = Math.min((current / max) * 100, 100);
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1 text-slate-500 font-medium">
          <span>{label}</span>
          <span>{current} / {max}</span>
        </div>
      )}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color}`} 
          style={{ width: `${percent}%` }} 
        />
      </div>
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; linkText?: string; onLinkClick?: () => void }> = ({ title, linkText, onLinkClick }) => (
  <div className="flex justify-between items-center mb-3 mt-6 px-1">
    <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    {linkText && (
      <button onClick={onLinkClick} className="text-sm text-blue-500 flex items-center font-medium">
        {linkText} <ChevronRight size={14} />
      </button>
    )}
  </div>
);

// Notification Toast for Gamification
export const RewardToast: React.FC<{ message: string; subMessage?: string; type: 'xp' | 'zc' | 'level_up' | 'info' }> = ({ message, subMessage, type }) => {
  const getIcon = () => {
    switch(type) {
      case 'xp': return <Zap size={20} className="text-yellow-500" fill="currentColor" />;
      case 'zc': return <div className="w-5 h-5 bg-yellow-400 rounded-full border-2 border-white" />;
      case 'level_up': return <Award size={24} className="text-white" />;
      default: return <Check size={20} className="text-green-500" />;
    }
  };

  const getStyles = () => {
    if (type === 'level_up') return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
    return "bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-500/10";
  };

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-full flex items-center gap-3 animate-bounce-in ${getStyles()}`}>
      <div className={`p-1 rounded-full ${type === 'level_up' ? 'bg-white/20' : 'bg-slate-50'}`}>
        {getIcon()}
      </div>
      <div className="flex flex-col">
        <span className="font-black text-sm uppercase tracking-wide leading-none">{message}</span>
        {subMessage && <span className={`text-[10px] font-medium leading-none mt-1 ${type === 'level_up' ? 'text-white/80' : 'text-slate-400'}`}>{subMessage}</span>}
      </div>
    </div>
  );
};
