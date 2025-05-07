
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/d0861369-02ca-4988-b177-5ea496cf05fe.png" 
        alt="EVAI Technologies Logo" 
        className={`${sizeClasses[size]}`}
      />
    </div>
  );
};
