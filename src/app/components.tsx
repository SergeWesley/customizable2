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
      style={style}
      {...rest}
    >
      <h2 className="font-semibold mb-2">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
import React from 'react';

// Composant Title
export function Title({ text }: { text: string }) {
  return <h1>{text}</h1>;
}

// Composant Button
export function Button({ label, onClickMessage }: { label: string; onClickMessage: string }) {
  return (
    <button
      onClick={() => {
        alert(onClickMessage);
      }}
      style={{ padding: '8px 16px', fontSize: '16px', margin: '8px 0' }}
    >
      {label}
    </button>
  );
}
