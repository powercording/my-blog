import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'tailwind-styled-components';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import debounce from '../../hooks/useDebounce';
import Input from '../../components/Input';

const WELCOM_WORD =
  '🪄 my-Blog 가입을 환영합니다. 계속 하시려면 아래의 정보를 입력해 주세요.';

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

const JoinFormContainer = tw.div`
  w-auto px-4 py-4
  space-y-3 overflow-hidden
  h-auto
`;

const JoinFormContainerLargeScreen = tw(JoinFormContainer)`
  sm:w-3/4  
  md:w-1/2
  lg:w-2/5
`;

const JoinForm = tw.form`
  flex
  flex-col
  gap-3
`;

const Button = tw.button<{ $show: boolean }>`
  ${props => (props.$show ? '' : 'hidden')}
  w-full
  bg-gray-100
  rounded-md
  hover:bg-gray-200
  h-8
`;

const KakaoButton = tw(Button)`
  bg-yellow-300
  hover:bg-yellow-200
`;

const GithubButton = tw(Button)`
  bg-black text-white
  hover:bg-gray-700
`;

const OrLine = tw.div`
relative text-center top-4
`;

const LoginWith = tw.div`
  absolute border-t-2 border-gray-300 w-full
`;

export default function Join() {
  const [showingWord, setShowingWord] = useState('');
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [emailDone, setEmailDone] = useState(false);
  const { register, handleSubmit } = useForm();
  const [useDebounce, isLoading] = debounce(valid, 1000);

  console.log(isLoading, '이즈로딩?');
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
        //return index 0 of string array every 0.05sec
        const displayWord = await delay(50, letterArray);
        setShowingWord(prev => (prev += displayWord));
      }
      if (!letterArray.length) {
        await delay(750, []);
        setWelcomeDone(true);
      }
    };

    typingEffect();
  }, []);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  async function valid() {
    fetch('api/join')
      .then(res => res.json())
      .then(json => {
        if (json.ok === true) {
          setEmailDone(true);
        }
      });
  }

  return (
    <JoinFormContainerLargeScreen>
      <WelcomeAnimation welcomeDone={welcomeDone}>
        {showingWord}
      </WelcomeAnimation>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          type="text"
          register={register('email', {
            required: true,
            onChange: () => useDebounce(),
          })}
          $show={welcomeDone}
        />
        <Input
          name="password"
          type="string"
          register={register('password', { required: true })}
          $show={emailDone}
        />
        <Button className="w-full" $show={emailDone}>
          Join
        </Button>
      </JoinForm>
      <OrLine>
        <LoginWith />
        <span className="relative bg-white px-2 -top-3">or</span>
      </OrLine>
      <div className="flex gap-2">
        <KakaoButton $show={true}>kakao Login</KakaoButton>
        <GithubButton $show={true}>github Login</GithubButton>
      </div>
    </JoinFormContainerLargeScreen>
  );
}
