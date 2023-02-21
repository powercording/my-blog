import Input from '@components/Input';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';

const Container = tw.div`
h-[calc(100%-56px)] px-3 
 flex flex-col items-center 
`;

const Top = tw.div`
  flex justify-between
`;

const Button = tw.button`

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
      <Top>
        <Input name="제목" type="text" register={register('subject')} />
        <Button>등록하기</Button>
      </Top>
      <PostEditor value={value} setValue={setValue} />
    </Container>
  );
}
