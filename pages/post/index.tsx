import Input from '@components/Input';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';

const Container = tw.div`
 h-screen px-3 
 flex flex-col items-center justify-center
`;

const PostEditor = dynamic(import('@components/PostEditor'), {
  ssr: false,
});

export default function Post() {
  const [value, setValue] = useState('');
  const { register } = useForm();

  PostEditor;

  return (
    <Container>
      <Input name="제목" type="text" register={register('subject')} />
      <PostEditor value={value} setValue={setValue} />
    </Container>
  );
}
