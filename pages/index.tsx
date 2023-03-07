import Post from '@components/Post';
import useUser from '@libs/client/useUser';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex flex-col h-full 
  lg:flex-row  mx-auto
`;

const CardContainer = tw.div`
  overflow-y-scroll relative w-full
  flex flex-col gap-2 px-4 
`;

export default function Home() {
  const user = useUser();
  const [currentPage, setCurrentPage] = useState(0);

  console.log(user);

  return (
    <Container>
      <CardContainer></CardContainer>
      <div>dds</div>
    </Container>
  );
}
