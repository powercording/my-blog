import Input from '@components/Input';
import useMutate from '@libs/client/useMutate';
import useUser from '@libs/client/useUser';
import { CONST } from '@libs/constant/CONST';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';

const JoinForm = tw.form`
  flex items-center justify-center
  flex-col my-10 py-2
  gap-3 
`;

const Button = tw.button<{ $show: boolean | string }>`
  w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/3 h-8 font-bold
  bg-gray-300 rounded-md text-gray-700
  hover:bg-gray-400  mt-3
`;

type LoginReturn = {
  ok: boolean;
  data?: any;
  message?: string;
};

export default function Login() {
  const { name } = useUser();
  const { register, handleSubmit } = useForm();
  const [mutate, { loading, data }] = useMutate('api/login');
  const router = useRouter();

  useEffect(() => {
    if (name) {
      router.replace('/');
    }
    if (data?.ok) {
      router.replace('/');
    }
  }, [router, name, data]);

  const handleLogin = async (formData: FieldValues) => {
    if (loading) return;
    const result = await mutate(formData);

    if (result?.ok === false) {
      alert(result?.message);
    }
  };

  const handleJoin = () => {
    router.push('join');
  };

  return (
    <>
      <JoinForm onSubmit={handleSubmit(handleLogin)}>
        <Input
          name="이메일"
          type="text"
          register={register('email', {
            required: true,
            pattern: CONST.EMAIL_REG,
          })}
        />
        <Input
          name="비밀번호"
          type="password"
          register={register('password', {
            required: true,
            pattern: CONST.PASSWORD_REG,
          })}
        />
        <Button type="submit" $show={loading}>
          {loading ? 'loading....' : '로그인'}
        </Button>
        <Button type="button" $show={loading} onClick={handleJoin}>
          가입하기
        </Button>
      </JoinForm>
    </>
  );
}
