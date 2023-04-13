import { Button } from 'react-bootstrap';

interface ButtonProps {
  increment: number;
  onIncrement: (incr: number) => void;
}

export default function IncrementButton({
  increment,
  onIncrement,
}: ButtonProps) {
  return (
    <Button
      onClick={() => {
        onIncrement(increment);
      }}
      variant={increment >= 0 ? 'primary' : 'danger'}
      className='me-3 my-3'
    >
      {increment >= 0
        ? `Increase by ${increment}`
        : `Decrease by ${Math.abs(increment)}`}
    </Button>
  );
}
