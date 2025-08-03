// Composant Card
export function Card({ title, content, className = '', style = {}, size = 'md', color = 'white', ...rest }: {
  title: string;
  content: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg' | string;
  color?: string;
  [key: string]: any;
}) {
  // Taille dynamique
  const sizeMap: Record<string, string> = {
    sm: 'p-2 text-base',
    md: 'p-6 text-lg',
    lg: 'p-10 text-xl',
  };
  const sizeClass = sizeMap[size] || '';
  return (
    <div
      className={`rounded-lg shadow-md bg-${color} mb-4 ${sizeClass} ${className}`.replace(/bg-(#[0-9a-fA-F]{3,6})/g, '')}
      style={{ fontFamily: 'inherit', ...style }}
      {...rest}
    >
      <h2 className="font-semibold mb-2" style={{ fontFamily: 'inherit' }}>{title}</h2>
      <p style={{ fontFamily: 'inherit' }}>{content}</p>
    </div>
  );
}
import React from 'react';

// Composant Title
export function Title({ text, className = '', ...rest }: { text: string; className?: string; [key: string]: any }) {
  return <h1 className={`font-bold text-2xl ${className}`} style={{ fontFamily: 'inherit' }} {...rest}>{text}</h1>;
}

// Composant Button
export function Button({ label, onClickMessage, className = '', ...rest }: { label: string; onClickMessage: string; className?: string; [key: string]: any }) {
  return (
    <button
      onClick={() => {
        alert(onClickMessage);
      }}
      className={`px-6 py-2 rounded-lg text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}
