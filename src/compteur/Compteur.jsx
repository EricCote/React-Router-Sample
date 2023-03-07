import React, { useState } from 'react';
import Boite from './Boite';
import Bouton from './Bouton';
import Titre from './Titre';

export default function Compteur({ init = 0 }) {
  const [compte, setCompte] = useState(init);

  function handleIncrement(increment) {
    setCompte(compte + increment);
  }
  function handleChange(valeur) {
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
