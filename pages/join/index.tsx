import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import debounce from '@hooks/useDebounce';
import tw from 'tailwind-styled-components';
import Input from '@components/Input';
import WelcomeJoin from '@components/WelcomeJoin';
import useMutate from '@libs/client/useMutate';

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

export default function Join() {
  const [emailOk, setEmailOk] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailDebounce, timer] = debounce(valid, 600);
  const [Greeting, animationEnd] = WelcomeJoin();
  const [mutate, { fetchLoading, error, data }] = useMutate('api/join');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (formData: FieldValues) => {
    mutate(formData);
    console.log(data);
  };
  console.log(watch().email);
  async function valid() {
    fetch(`api/user/get?email=${watch().email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => console.log(json));

    setEmailOk(true);
  }

  const emailRegExp = new RegExp(
    /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  );

  const checkRegExp = (
    e: React.ChangeEvent<HTMLInputElement>,
    fn: () => void,
    reg: RegExp,
  ) => {
    if (reg.test(e.target.value)) {
      fn();
    }
    if (!reg.test(e.target.value)) {
      clearTimeout(timer);
      setEmailOk(() => false);
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
              pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              onChange: event => checkRegExp(event, emailDebounce, emailRegExp),
            })}
          />
          <p className="absolute right-2 top-8">
            {isLoading ? 'checking..' : emailOk ? '✅' : '❌'}
          </p>
        </InputContainer>
        <InputContainer $show={emailOk}>
          <Input
            name="password"
            type="string"
            register={register('password', {
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
                message:
                  '비밀번호는 각 한개 이상의 문자,숫자,특수문자가 포함되어야 합니다.',
              },
            })}
          />
          <p className="text-xs text-red-400">안녕하세용</p>
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
