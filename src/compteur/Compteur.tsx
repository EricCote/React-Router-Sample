import React, { useState } from 'react';
import Boite from './Boite';
import Bouton from './Bouton';
import Titre from './Titre';

interface CompteurProps {
  init?: number;
}

export default function Compteur({ init = 0 }: CompteurProps) {
  const [compte, setCompte] = useState<number | null>(init);

  function handleIncrement(increment: number) {
    setCompte((compte ?? 0) + increment);
  }
  function handleChange(valeur: string) {
    if (parseInt(valeur) || parseInt(valeur) === 0 || valeur === '') {
      if (valeur === '') setCompte(null);
      else setCompte(parseInt(valeur));
    }
  }
  return (
    <div>
      <Titre nombre={compte} />
      <Bouton increment={1} onIncrement={handleIncrement} />
      <Bouton increment={-10} onIncrement={handleIncrement} />
      <Bouton increment={100} onIncrement={handleIncrement} />
      <Boite nombre={compte} onChange={handleChange} />
    </div>
  );
}
