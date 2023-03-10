import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'tailwind-styled-components';

const typeEffect = keyframes`
  50% {
    opacity : 1;
  }
`;

const WelcomeAnimation = styled.div<{
  welcomeDone: boolean;
}>`
  transition: height 1s;

  &::after  {
    content: '';
    border-right: 2px solid white;
    opacity: 0;
    animation: ${props => props.welcomeDone ? '' : typeEffect} 0.4s step-end infinite;
  }
`;

const WelcomeMessage = tw(WelcomeAnimation)`
  text-white
`;
const delay = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
};

export default function WelcomeJoin() {
  const [state, setState] = useState({
    welcomeDone: false,
    typeEffect: '',
  });
  const { typeEffect, welcomeDone } = state;
  useEffect(() => {
    const typingEffect = async () => {
      let hello = document.querySelector('#welcome') as HTMLElement | null;
      const WELCOM_WORD =
        'πͺ my-Blog κ°μμ νμν©λλ€. κ³μ νμλ €λ©΄ μλμ μ λ³΄λ₯Ό μλ ₯ν΄ μ£ΌμΈμ.';

      for (let char = 0; char < WELCOM_WORD.length; char++) {
        await delay(40);
        hello!.innerHTML += WELCOM_WORD[char];
      }

      await delay(750);
      setState({ welcomeDone: true, typeEffect: WELCOM_WORD });
    };

    typingEffect();

    return () => setState({ welcomeDone: false, typeEffect: '' });
  }, []);

  const WelcomeLine = () => {
    return (
      <WelcomeMessage welcomeDone={welcomeDone} id="welcome">
        {typeEffect}
      </WelcomeMessage>
    );
  };

  return [WelcomeLine, welcomeDone] as const;
}
