import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'tailwind-styled-components';
import { useForm } from 'react-hook-form';

const WELCOM_WORD =
  '🪄my-Blog 가입을 환영합니다. 계속 하시려면 아래의 정보를 입력해 주세요.';

const typeEffect = keyframes`
  50% {
    opacity : 0;
  }
`;

const WelcomAnimation = styled.div<{
  welcomeDone: boolean;
  emailDone?: boolean;
}>`
  transition: height 1s;
  &: after {
    content: ' ';
    border-right: 2px solid black;
    animation: ${props => (props.welcomeDone ? '' : typeEffect)} 0.4s step-end
      infinite;
  }
`;

function defineHeight(welcome: boolean, email: boolean) {
  if (!email && !welcome) {
    return 'h-14';
  }
  if (!email && welcome) {
    return 'h-36';
  }
  if (email && welcome) {
    return 'h-80';
  }
}

const JoinFormContainer = tw(WelcomAnimation)`
  w-auto px-4 py-4
  space-y-10 overflow-hidden
  shadow-md
  ${props => defineHeight(props.welcomeDone, props.emailDone)}
`;

const JoinForm = tw.form`
  flex
  flex-col
  gap-3
`;

const InputExtends = styled.input.attrs(props => {
  type: props.type || 'text';
})``;

const CustomInput = tw(InputExtends)`
  w-auto
  h-12
  bg-slate-50
`;

const Button = tw.button`
  w-1/2
`;

export default function Join() {
  const [showingWord, setShowingWord] = useState('');
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [emailDone, setEmailDone] = useState(false);
  const { register, handleSubmit } = useForm();

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

  const onSubmit = () => {
    console.log('하이');
  };

  return (
    <JoinFormContainer welcomeDone={welcomeDone} emailDone={emailDone}>
      <WelcomAnimation welcomeDone={welcomeDone}>{showingWord}</WelcomAnimation>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          {...register('email', {
            required: '이거입력해야하는데?',
          })}
          placeholder="이메일을 입력해주세요"
        />
        <CustomInput
          placeholder="비밀번호를 입력해주세요"
          disabled={emailDone ? 'false' : 'true'}
        />
        <Button>dd</Button>
        <Button>카카오버튼</Button>
        <Button>깃헙버튼</Button>
      </JoinForm>
    </JoinFormContainer>
  );
}
