import { useState } from 'react';
import tw from 'tailwind-styled-components';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
50% {
  opacity: 0;
}
`;
const Masterdiv = styled.div<{ $textColor: boolean }>`
  animation: ${move} 1s step-end infinite;
`;
const Container = tw(Masterdiv)`
  ${props => (props.$textColor ? 'text-red-400' : 'text-blue-400')}
bg-slate-200
  w-auto
`;

export default function Home() {
  const [textColor, setTextColor] = useState(true);

  function changeColor() {
    setTextColor(prev => !prev);
  }

  return (
    <>
      <Container $textColor={textColor} className="h-80">
        버튼클릭하면 색이 바뀝니다.
      </Container>
      <button onClick={changeColor}>버튼이에요</button>
    </>
  );
}
