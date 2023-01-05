import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'tailwind-styled-components';

const WELCOM_WORD = "환영합니다. next'js 로 만든my-Blog입니다.";

const typeEffect = keyframes`
  50% {
    opacity : 0;
  }
`;

const WelcomAnimation = styled.div`
  &: after {
    content:" "
    border-right: 2px solid black;
    animation: ${typeEffect} 1s step-end infinite;
  }
`;

const WelcomeWord = tw(WelcomAnimation)``;

export default function Login() {
  const [showingWord, setShowingWord] = useState('');
  const [welcomDone, setWelcomeDone] = useState(false);

  useEffect(() => {
    const delay = (ms: number, letterArray: string[]) => {
      if (letterArray)
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
        const displayWord = await delay(100, letterArray);
        setShowingWord(prev => (prev += displayWord));
      }
    };

    typingEffect();
  }, []);

  return (
    <>
      <WelcomeWord>{showingWord}</WelcomeWord>
    </>
  );
}
