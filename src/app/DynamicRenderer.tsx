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

  // Helper pour extraire className/style d'une section
  const getSectionProps = (section: any) => {
    if (!section) return {};
    const { className = '', style = {} } = section;
    return { className, style };
  };

  // Déterminer la grille dynamiquement selon la présence du sidebar
  const hasSidebar = !!layout.sidebar;
  const gridClass = hasSidebar
    ? 'grid grid-cols-[200px_1fr] grid-rows-[auto_1fr_auto] min-h-screen'
    : 'grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-screen';

  return (
    <div className={gridClass}>
      {/* Header */}
      {layout.header && (
        <header
          className={`${hasSidebar ? 'col-span-2' : ''} row-start-1 ${getSectionProps(layout.header).className}`}
          style={getSectionProps(layout.header).style}
        >
          {renderSection(layout.header)}
        </header>
      )}
      {/* Sidebar */}
      {hasSidebar && (
        <aside
          className={`row-span-2 row-start-2 col-start-1 p-4 ${getSectionProps(layout.sidebar).className}`}
          style={getSectionProps(layout.sidebar).style}
        >
          {renderSection(layout.sidebar)}
        </aside>
      )}
      {/* Main */}
      {layout.main && (
        <main
          className={`${hasSidebar ? 'col-start-2' : 'col-start-1'} row-start-2 p-8 ${getSectionProps(layout.main).className}`}
          style={getSectionProps(layout.main).style}
        >
          {renderSection(layout.main)}
        </main>
      )}
      {/* Footer */}
      {layout.footer && (
        <footer
          className={`${hasSidebar ? 'col-span-2' : ''} row-start-3 ${getSectionProps(layout.footer).className}`}
          style={getSectionProps(layout.footer).style}
        >
          {renderSection(layout.footer)}
        </footer>
      )}
    </div>
  );
}
