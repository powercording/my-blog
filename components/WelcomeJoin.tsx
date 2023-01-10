import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const typeEffect = keyframes`
  50% {
    opacity : 0;
  }
`;

const WelcomeAnimation = styled.div<{
  welcomeDone: boolean;
  emailDone?: boolean;
}>`
  transition: height 1s;
  &: after {
    content: '';
    border-right: 2px solid black;
    animation: ${props => (props.welcomeDone ? '' : typeEffect)} 0.4s step-end
      infinite;
  }
`;

export default function WelcomeJoin() {
  const [showingWord, setShowingWord] = useState('');
  const [welcomeDone, setWelcomeDone] = useState(false);
  const WELCOM_WORD =
    '🪄 my-Blog 가입을 환영합니다. 계속 하시려면 아래의 정보를 입력해 주세요.';

  useEffect(() => {
    //this delay function downbelow, should be moved to somewhere other file to shorten this function's line of code
    const delay = (ms: number, letterArray: string[]) => {
      if (letterArray.length)
        return new Promise(res =>
          setTimeout(() => {
            res(letterArray.shift());
          }, ms),
        );

      return new Promise(res => setTimeout(res, ms));
    };

    const typingEffect = async () => {
      let letterArray = WELCOM_WORD.split('');

      while (letterArray.length) {
        //return index 0 of string array every 0.05sec
        const displayWord = await delay(40, letterArray);
        setShowingWord(prev => (prev += displayWord));
      }
      if (!letterArray.length) {
        await delay(750, []);
        setWelcomeDone(true);
      }
    };

    typingEffect();
  }, []);

  const WelcomeLine = () => {
    return (
      <WelcomeAnimation welcomeDone={welcomeDone}>
        {showingWord}
      </WelcomeAnimation>
    );
  };

  return [WelcomeLine, welcomeDone] as const;
}
