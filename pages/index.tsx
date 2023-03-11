import Post from '@components/Post';
import useUser from '@libs/client/useUser';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

const MenuContainer = tw.div`
  py-10 w-screen lg:w-1/3 xl:w-1/4 2xl:w-1/5 
  text-center bg-white border
  h-60 lg:h-full
  
  text-xl
  font-sans
`;

const Container = tw.div`
  flex flex-col h-full w-full
  lg:flex-row
`;

const WelcomeWord = tw.h1`
  font-extrabold inline
`;

const CardContainer = tw.div`
  overflow-x-hidden relative rounded-xl
  flex gap-2 w-[50%]
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
