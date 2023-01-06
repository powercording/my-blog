import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'tailwind-styled-components';

const WELCOM_WORD = "환영합니다. next'js 로 만든my-Blog입니다.";

const typeEffect = keyframes`
  50% {
    opacity : 0;
  }
`;

const WelcomAnimation = styled.div<{ welcomeDone: boolean }>`
  &: after {
    content: ' ';
    border-right: 2px solid black;
    animation: ${props => (props.welcomeDone ? '' : typeEffect)} 0.4s step-end
      infinite;
  }
`;

const WelcomeWord = tw(WelcomAnimation)``;

const JoinFormContainer = tw.div`
  shadow-md w-1/2
`;

const joinFormEffect = styled.form<{ show: boolean }>`
  transition: height 1s ease-in;
`;

const JoinForm = tw(joinFormEffect)`
  flex
  flex-col
  ${props => (props.show ? 'h-48' : 'h-12')}
  overflow-hidden
`;

export default function Join() {
  const [showingWord, setShowingWord] = useState('');
  const [welcomDone, setWelcomeDone] = useState(false);

  //useEffect for typing animation
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
        //return index 0 of string array every 0.075sec
        const displayWord = await delay(75, letterArray);
        setShowingWord(prev => (prev += displayWord));
      }
      if (!letterArray.length) {
        await delay(1000, []);
        setWelcomeDone(true);
      }
    };

    typingEffect();
  }, []);

  return (
    <>
      <WelcomeWord welcomeDone={welcomDone}>{showingWord}</WelcomeWord>
      <br />
      <JoinFormContainer>
        <JoinForm show={welcomDone}>
          id :
          <input type="text" />
          <button>dd</button>
        </JoinForm>
      </JoinFormContainer>
    </>
  );
}
