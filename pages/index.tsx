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
      <WelcomeWord>블로그 시작페이지 입니다.</WelcomeWord>
    </Container>
  );
}
