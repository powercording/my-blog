import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import useDebounce from '@hooks/useDebounce';
import tw from 'tailwind-styled-components';
import Input from '@components/Input';
import useMutate from '@libs/client/useMutate';
import { CONST } from '@libs/constant/CONST';
import { useRouter } from 'next/router';

const JoinFormContainer = tw.div`
  w-auto px-4
  space-y-3 overflow-hidden
  h-auto
  mx-auto
`;

const JoinFormContainerLargeScreen = tw(JoinFormContainer)`
  sm:w-3/4  
  md:w-1/2
  lg:w-2/5
  xl:w-1/3
`;

const JoinFormRow = tw.form`
  flex
  flex-col
  gap-3
`;

const InputContainer = tw.div<{ $show: boolean | string }>`
  relative
  ${props => (props.$show ? '' : 'hidden')}
`;

const Button = tw.button<{ $show: boolean | string }>`
  ${props => (props.$show ? '' : 'hidden')}
  w-full h-8
  bg-gray-300
  rounded-md
  hover:bg-gray-400
  mt-3
  font-bold
  text-white
`;

const InfoMessage = tw.p`
text-xs text-white mt-1 ml-2
`;

export default function LoginForm() {
  const [emailOk, setEmailOk] = useState(false);
  const [refuse, setRefuse] = useState<string | null>(null);
  const [emailDebounce, debounceLoading, timer] = useDebounce(600);
  const [userJoin, { data, loading }, joinDataReset] = useMutate('api/join');
  const [confirm, { data: confirmResult, loading: confirmLoading }] =
    useMutate('api/join/confirm');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (confirmResult?.ok) {
      router.push('/');
    }
  }, [confirmResult, router]);

  //reset 을 좀더 fancy 하게 사용할 수있을까.
  const resetState = () => {
    setEmailOk(() => false);
    reset({ password: '', repeat: '', payload: '' });
    joinDataReset();
  };

  const handleJoin = async (formData: FieldValues) => {
    if (loading) return;
    const loginEmail = formData;
    loginEmail.type = "login"
  
    await userJoin(formData);
    setTimeout(() => {
      setFocus('payload');
    }, 0);
  };

  const onSubmit = async (formData: FieldValues) => {
    if (confirmLoading) return;
    confirm(formData);
  };

  //아래 나열된 조건식을 좀 줄여보기.
  const setFeedback = (user: Object | null) => {
    if (!user) {
      console.log(user);
      setRefuse(CONST.EMAIL_NO_EXIST);
      resetState();
    }
    if (user) {
      setEmailOk(true);
      setRefuse(null);
      setTimeout(() => {
        setFocus('password');
      }, 0);
    }
  };

  const userApiDebounce = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEmail = e.target.value;
    const regPass = CONST.EMAIL_REG.test(userEmail);

    resetState();

    regPass
      ? await fetch(`api/user/get?email=${userEmail}`)
          .then(response => response.json().catch(e => console.log(e)))
          .then(user => {
            setFeedback(user);
          })
          .catch(e => console.log(e))
      : (setRefuse(null), clearTimeout(timer));
  };

  const toggleDisabled = (e: any) => {
    e.target.removeAttribute('disabled');
  };

  return (
    <JoinFormContainerLargeScreen>
      <JoinFormRow
        onSubmit={data?.ok ? handleSubmit(onSubmit) : handleSubmit(handleJoin)}
      >
        <InputContainer $show={true}>
          <Input
            onClick={toggleDisabled}
            name="email"
            type="text"
            register={register('email', {
              required: true,
              pattern: CONST.EMAIL_REG,
              onChange(event) {
                emailDebounce(() => userApiDebounce(event));
              },
              onBlur(event) {
                event.target.setAttribute('disabled', true);
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
          <InfoMessage>
            {errors?.password?.message
              ? `${errors.password.message}`
              : data?.ok
              ? '인증번호를 발송했습니다'
              : loading
              ? 'loading...'
              : null}
          </InfoMessage>
        </InputContainer>
        <InputContainer $show={data?.ok}>
          <Input
            id="confirm"
            name="Confirm number"
            type="stirng"
            register={register('payload')}
          ></Input>
        </InputContainer>
        <Button className="w-full" $show={emailOk}>
          {loading
            ? 'loading....'
            : data?.ok
            ? '인증하기 (가입완료)'
            : '회원가입'}
        </Button>
      </JoinFormRow>
    </JoinFormContainerLargeScreen>
  );
}
