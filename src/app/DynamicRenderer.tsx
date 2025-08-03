"use client";
import React, { Suspense } from 'react';
import { Title, Button, Card } from './components';

const componentMap: Record<string, React.FC<any>> = {
  Title,
  Button,
  Card,
};


function useConfig() {
  const [config, setConfig] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/config.json');
        if (!res.ok) throw new Error('Erreur de chargement de la configuration');
        const data = await res.json();
        setConfig(data);
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, []);
  return { config, error };
}

export default function DynamicRenderer() {
  const { config, error } = useConfig();
  if (error) return <div style={{color: 'red'}}>Erreur: {error}</div>;
  if (!config) return <div>Chargement...</div>;

  // Helper pour rendre une liste de composants d'une section
  const renderSection = (section: any) => {
    if (!section || !Array.isArray(section.components)) return null;
    return section.components.map((comp: any, idx: number) => {
      const Comp = componentMap[comp.type];
      if (!Comp) return null;
      // On extrait className et style pour wrapper, le reste va au composant
      const { className, style, ...props } = comp.props || {};
      return (
        <div key={idx} className={className} style={style}>
          <Comp {...props} />
        </div>
      );
    });
  };

  const layout = config.layout || {};

  return (
    <div className="grid grid-cols-[200px_1fr] grid-rows-[auto_1fr_auto] min-h-screen">
      {/* Header */}
      <header className="col-span-2 row-start-1">
        {renderSection(layout.header)}
      </header>
      {/* Sidebar */}
      <aside className="row-span-2 row-start-2 col-start-1 bg-gray-50 p-4">
        {renderSection(layout.sidebar)}
      </aside>
      {/* Main */}
      <main className="col-start-2 row-start-2 p-8">
        {renderSection(layout.main)}
      </main>
      {/* Footer */}
      <footer className="col-span-2 row-start-3 bg-gray-100">
        {renderSection(layout.footer)}
      </footer>
    </div>
  );
}
