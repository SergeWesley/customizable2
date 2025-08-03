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
