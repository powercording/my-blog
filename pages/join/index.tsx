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
  const [emailDone, setEmailDone] = useState(false);
  const { register, handleSubmit } = useForm();
  const [useDebounce, isLoading] = debounce(valid, 1000);
  const [WelcomeWord, welcomeEnd] = WelcomeJoin();

  console.log(isLoading, '이즈로딩?');

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
      <WelcomeWord></WelcomeWord>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          type="text"
          register={register('email', {
            required: true,
            onChange: () => useDebounce(),
          })}
          $show={welcomeEnd}
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
