import useUser from '@libs/client/useUser';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex;
`;
const WelcomeWord = tw.h1`
  font-extrabold
`;

export default function Home() {
  const user = useUser();
  console.log(user);
  return (
    <Container>
      <WelcomeWord>Home.index</WelcomeWord>
    </Container>
  );
}
