import { useState } from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div<{ textColor: boolean }>`
  ${props => (props.textColor ? 'text-red-400' : 'text-blue-400')}
`;

export default function Home() {
  const [textColor, setTextColor] = useState(true);

  function changeColor() {
    setTextColor(prev => !prev);
  }

  return (
    <>
      <Container textColor={textColor}>fdaf</Container>
      <button onClick={changeColor}>이거에용</button>
    </>
  );
}
