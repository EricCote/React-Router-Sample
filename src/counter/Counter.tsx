import { useState } from 'react';
import Box from './Box';
import Button from './Button';
import Title from './Title';

interface CounterProps {
  init?: number;
}

export default function Counter({ init = 0 }: CounterProps) {
  const [count, setCount] = useState<number | null>(init);

  function handleIncrement(increment: number) {
    setCount((count ?? 0) + increment);
  }
  function handleChange(value: string) {
    if (parseInt(value) || parseInt(value) === 0 || value === '') {
      if (value === '') setCount(null);
      else setCount(parseInt(value));
    }
  }
  return (
    <div>
      <Title num={count} />
      <Button increment={1} onIncrement={handleIncrement} />
      <Button increment={-10} onIncrement={handleIncrement} />
      <Button increment={100} onIncrement={handleIncrement} />
      <Box num={count} onChange={handleChange} />
    </div>
  );
}
