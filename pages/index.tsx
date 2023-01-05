import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex;
`;
const WelcomeWord = tw.h1`
  font-extrabold
`;

export default function Home() {
  return (
    <Container>
      <WelcomeWord>Home.index</WelcomeWord>
    </Container>
  );
}
