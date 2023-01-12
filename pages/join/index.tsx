import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import useDebounce from '@hooks/useDebounce';
import tw from 'tailwind-styled-components';
import Input from '@components/Input';
import WelcomeJoin from '@components/WelcomeJoin';
import useMutate from '@libs/client/useMutate';
import { CONST } from '@libs/constant/CONST';

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
  const { register, handleSubmit, watch, reset } = useForm();

  const onSubmit = (formData: FieldValues) => {
    mutate(formData);
    console.log(data);
  };

  const setFeedback = (user: Object | null) => {
    user
      ? (setEmailOk(false), //if user,
        setRefuse(CONST.EMAIL_EXIST),
        reset({ password: '' }))
      : (setEmailOk(true), setRefuse(null)); //if no user
  };

  const userApiDebounce = async (pass: boolean) => {
    if (pass) {
      const user = await emailDebounce(`api/user/get?email=${watch().email}`);
      setFeedback(user!);
    }
    if (!pass) {
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
              onChange: e =>
                userApiDebounce(CONST.EMAIL_REG.test(e.target.value)),
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
        <KakaoButton $show={true}>kakao Login</KakaoButton>
        <GithubButton $show={true}>github Login</GithubButton>
      </div>
    </JoinFormContainerLargeScreen>
  );
}
