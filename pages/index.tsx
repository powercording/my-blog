import useUser from '@libs/client/useUser';
import { useState } from 'react';
import tw from 'tailwind-styled-components';


const Container = tw.div`
  flex flex-col h-full w-full 
  lg:flex-row
`;

export default function Home() {
  const user = useUser();
  const [currentPage, setCurrentPage] = useState(0);

  console.log(user);

  return (
    <Container>
      <div>dds</div>
    </Container>
  );
}
