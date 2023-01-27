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
  bg-gray-300
  rounded-md
  hover:bg-gray-400
  mt-3
  font-bold
  text-gray-700
`;

const InputContainer = tw.div<{ $show: boolean | string }>`
  relative
  ${props => (props.$show ? '' : 'hidden')}
`;

const KakaoButton = tw(Button)`
  bg-yellow-200
  hover:bg-yellow-100
`;

const GithubButton = tw(Button)`
  bg-gray-800 text-white
  hover:bg-gray-500
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
  const [emailDebounce, debounceLoading, timer] = useDebounce(600);
  const [passwordDebounce] = useDebounce(600);
  const [Greeting, animationEnd] = WelcomeJoin();
  const [mutate, dataReset, { data, loading }] = useMutate('api/join');
  const { register, handleSubmit, reset, getValues } = useForm();


  const handleJoin = (formData: FieldValues) => {
    // const testData = {
    //   email: getValues('email'),
    //   password: getValues('password'),
    // };
    mutate(formData);
    console.log(data?.ok);
  };

  const onSubmit = () => {
    console.log(getValues('payLoad'));
  };

  const setFeedback = (user: Object | null) => {
    if (user) {
      setEmailOk(false); //if user,
      setRefuse(CONST.EMAIL_EXIST);
      reset({ password: '' });
      dataReset();
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
      await fetch(`api/user/get?email=${userEmail}`)
        .then(response => response.json().catch(e => console.log(e)))
        .then(user => {
          console.log(user);
          setFeedback(user);
        })
        .catch(e => console.log(e));
    }
    if (!passReg) {
      clearTimeout(timer);
      reset({ password: '' });
      setEmailOk(() => false);
      setRefuse(null);
      dataReset();
    }
  };

  const passwordCheck = async () => {
    console.log('password Checking');
  };

  return (
    <JoinFormContainerLargeScreen>
      <Greeting></Greeting>
      <JoinForm
        onSubmit={data?.ok ? handleSubmit(onSubmit) : handleSubmit(handleJoin)}
      >
        <InputContainer $show={animationEnd}>
          <Input
            name="email"
            type="text"
            register={register('email', {
              required: true,
              pattern: CONST.EMAIL_REG,
              onChange(event) {
                emailDebounce(() => userApiDebounce(event));
              },
            })}
          />
          <InfoMessage>
            {debounceLoading
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
              pattern: CONST.PASSWORD_REG,
              onChange(event) {
                passwordDebounce(passwordCheck);
              },
            })}
          />
          <InfoMessage className="text-xs text-red-400">
            비밀번호를는 숫자 문자 특수문자를 한개이상 포함해야 합니다.
          </InfoMessage>
        </InputContainer>
        <InputContainer $show={data?.ok}>
          <Input
            name="Secret Number"
            type="stirng"
            register={register('payLoad')}
          ></Input>
        </InputContainer>
        <Button className="w-full" $show={emailOk}>
          {data?.ok ? '인증하기' : '회원가입'}
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
