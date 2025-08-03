"use client";
import React, { Suspense } from 'react';
import { Title, Button } from './components';

const componentMap: Record<string, React.FC<any>> = {
  Title,
  Button,
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
  return (
    <div>
      {config.components.map((comp: any, idx: number) => {
        const Comp = componentMap[comp.type];
        if (!Comp) return null;
        // On extrait className du reste des props pour l'appliquer au wrapper
        const { className, ...props } = comp.props || {};
        return (
          <div key={idx} className={className}>
            <Comp {...props} />
          </div>
        );
      })}
    </div>
  );
}
