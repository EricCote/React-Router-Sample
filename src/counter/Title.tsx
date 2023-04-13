interface TitleProps {
  num: number | null;
}

export default function Title({ num }: TitleProps) {
  return <h1>The number is {num}</h1>;
}
