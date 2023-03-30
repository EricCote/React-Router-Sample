import React from 'react';

interface TitreProps {
  nombre: number | null;
}

export default function Titre({ nombre }: TitreProps) {
  return <h1>Le nombre est {nombre}</h1>;
}
