'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface LuxuryButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
}

const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className = '', onClick, type = 'button', disabled, external }, ref) => {
    const base = 'inline-flex items-center justify-center font-sans tracking-[0.25em] uppercase transition-all duration-400 select-none';

    const variants = {
      primary: 'bg-black text-white hover:bg-black/80',
      outline: 'border border-black/30 text-black hover:border-black hover:bg-black/5',
      ghost: 'text-black/60 hover:text-black',
    };

    const sizes = {
      sm: 'text-[10px] px-5 py-2',
      md: 'text-[11px] px-7 py-3',
      lg: 'text-xs px-10 py-4',
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${classes} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        {children}
      </motion.button>
    );
  }
);

LuxuryButton.displayName = 'LuxuryButton';
export default LuxuryButton;
