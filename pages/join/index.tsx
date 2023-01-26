import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import useDebounce from '@hooks/useDebounce';
import tw from 'tailwind-styled-components';
import Input from '@components/Input';
import WelcomeJoin from '@components/WelcomeJoin';
import useMutate from '@libs/client/useMutate';
import { CONST } from '@libs/constant/CONST';
import Link from 'next/link';

const JoinFormContainer = tw.div`
  w-auto px-4 py-4
  space-y-3 overflow-hidden
  h-auto
`;

const JoinFormContainerLargeScreen = tw(JoinFormContainer)`
  sm:w-3/4  
  md:w-1/2
  lg:w-2/5
  xl:w-1/3
`;

const JoinForm = tw.form`
  flex
  flex-col
  gap-3
`;

const Button = tw.button<{ $show: boolean | string }>`
  ${props => (props.$show ? '' : 'hidden')}
  w-full h-8
  bg-gray-100
  rounded-md
  hover:bg-gray-200
  mt-3
`;

const InputContainer = tw.div<{ $show: boolean | string }>`
  relative
  ${props => (props.$show ? '' : 'hidden')}
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
relative text-center top-6
`;

const LoginWith = tw.div`
  absolute border-t-2 border-gray-300 w-full
`;

const InfoMessage = tw.p`
text-xs text-red-300 mt-1 ml-2
`;

export default function Join() {
  const [emailOk, setEmailOk] = useState<boolean>(false);
  const [refuse, setRefuse] = useState<string | null>(null);
  const [emailDebounce, { loading }, timer] = useDebounce(600);
  const [Greeting, animationEnd] = WelcomeJoin();
  const [mutate, { data }] = useMutate('api/join');
  const { register, handleSubmit, reset } = useForm();

  console.log('랜더링 테스트');

  const onSubmit = (formData: FieldValues) => {
    mutate(formData);
    console.log(data);
  };

  const setFeedback = (user: Object | null) => {
    if (user) {
      setEmailOk(false), //if user,
        setRefuse(CONST.EMAIL_EXIST),
        reset({ password: '' });
    }
    if (!user) {
      setEmailOk(true), setRefuse(null);
      const passWordInput = document.querySelector('#password') as HTMLElement;
      console.dir(passWordInput);
      if (passWordInput) {
        setTimeout(() => {
          passWordInput.focus();
        }, 10);
      }
    }
  };

  const userApiDebounce = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEmail = e.target.value;
    const passReg = CONST.EMAIL_REG.test(userEmail);

    if (passReg) {
      const user = await fetch(`api/user/get?email=${userEmail}`)
        .then(response => response.json().catch(e => console.log(e)))
        .then(json => {
          console.log(json);
          setFeedback(json);
        })
        .catch(e => console.log(e));
    }
    if (!passReg) {
      clearTimeout(timer);
      reset({ password: '' });
      setEmailOk(() => false);
      setRefuse(null);
    }
  };

  return (
    <JoinFormContainerLargeScreen>
      <Greeting></Greeting>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer $show={animationEnd}>
          <Input
            name="email"
            type="text"
            register={register('email', {
              required: true,
              pattern: CONST.EMAIL_REG,
              onChange: e => emailDebounce(() => userApiDebounce(e)),
            })}
          />
          <InfoMessage>
            {loading
              ? 'checking..'
              : emailOk
              ? '☑️'
              : refuse ?? CONST.ENTER_EMAIL}
          </InfoMessage>
        </InputContainer>
        <InputContainer $show={emailOk}>
          <Input
            id="password"
            name="password"
            type="string"
            register={register('password', {
              required: true,
              pattern: {
                value: CONST.PASSWORD_REG,
                message: CONST.PASSWORD_ERR,
              },
            })}
          />
          <InfoMessage className="text-xs text-red-400">
            비밀번호를 입력해 주세요
          </InfoMessage>
        </InputContainer>

        <Button className="w-full" $show={emailOk}>
          Join
        </Button>
      </JoinForm>
      <OrLine>
        <LoginWith />
        <span className="relative bg-white px-2 -top-3">or</span>
      </OrLine>
      <div className="flex gap-2">
        <Link href="api/login/kakaoLogin" className="w-full">
          <KakaoButton $show={true}>kakao Login</KakaoButton>
        </Link>
        <Link href="" className="w-full">
          <GithubButton $show={true}>github Login</GithubButton>
        </Link>
      </div>
    </JoinFormContainerLargeScreen>
  );
}
