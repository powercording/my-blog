import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import debounce from '../../hooks/useDebounce';
import tw from 'tailwind-styled-components';
import Input from '../../components/Input';
import WelcomeJoin from '../../components/WelcomeJoin';

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
  w-full
  bg-gray-100
  rounded-md
  hover:bg-gray-200
  h-8
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
  const [emailDone, setEmailDone] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [emailDebounce, timer] = debounce(valid, 600);
  const [WelcomeWord, welcomeEnd] = WelcomeJoin();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  async function valid() {
    setIsLoading(() => true);
    fetch('api/join')
      .then(res => res.json())
      .then(json => {
        if (json.ok === true) {
          setIsLoading(() => false);
          setEmailDone(true);
        }
      });
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
      setEmailDone(() => false);
    }
  };

  return (
    <JoinFormContainerLargeScreen>
      <WelcomeWord></WelcomeWord>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer $show={welcomeEnd}>
          <Input
            name="email"
            type="text"
            register={register('email', {
              required: true,
              onChange: event => checkRegExp(event, emailDebounce, emailRegExp),
            })}
          />
          <p className="absolute right-2 top-8">
            {isLoading ? 'checking' : emailDone ? '✅' : '❌'}
          </p>
        </InputContainer>
        <InputContainer $show={emailDone}>
          <Input
            name="password"
            type="string"
            register={register('password', { required: true })}
          />
        </InputContainer>

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
