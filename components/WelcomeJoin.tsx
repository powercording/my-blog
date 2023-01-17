import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const typeEffect = keyframes`
  50% {
    opacity : 1;
  }
`;

const WelcomeAnimation = styled.div<{
  welcomeDone: boolean;
}>`
  transition: height 1s;
  &: after {
    content: '';
    border-right: 2px solid black;
    opacity: 0;
    animation: ${props => (props.welcomeDone ? '' : typeEffect)} 0.4s step-end
      infinite;
  }
`;

export default function WelcomeJoin() {
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [typeEffect, setTypeEffect] = useState('');

  const delay = (ms: number) => {
    return new Promise(res => setTimeout(res, ms));
  };

  useEffect(() => {
    const typingEffect = async () => {
      let hello = document.querySelector('#welcome') as HTMLElement | null;
      const WELCOM_WORD =
        '🪄 my-Blog 가입을 환영합니다. 계속 하시려면 아래의 정보를 입력해 주세요.';

      for (let char = 0; char < WELCOM_WORD.length; char++) {
        await delay(40);
        hello!.innerHTML += WELCOM_WORD[char];
      }

      if (hello!.innerText == WELCOM_WORD) {
        await delay(750);
        setTypeEffect(WELCOM_WORD);
        setWelcomeDone(true);
      }
    };

    typingEffect();
  }, []);

  const WelcomeLine = () => {
    return (
      <WelcomeAnimation welcomeDone={welcomeDone} id="welcome">
        {typeEffect}
      </WelcomeAnimation>
    );
  };

  return [WelcomeLine, welcomeDone] as const;
}
