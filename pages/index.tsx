import useUser from '@libs/client/useUser';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex-col
  h-full
`;
const WelcomeWord = tw.h1`
  font-extrabold
`;

const CardContainer = tw.div`
  flex h-full gap-2
`;

const Card = tw.div`
  box-border flex flex-col p-5 gap-5
  w-80 h-full bg-white border-gray-300 border-2 rounded-lg
  hover:cursor-pointer shadow-slate-400 shadow-md
  relative items-start
`;

const Img = tw.img`
  w-full rounded-lg
  h-full blur-sm
`;

const Discription = tw.div`
  absolute top-[5%] bottom-[5%] left-[8%] right-[8%] flex 
  flex-col justify-end
  items-start
`;

const Subject = tw.h1`
  font-extrabold
`;

export default function Home() {
  const user = useUser();
  console.log(user);
  return (
    <Container>
      <WelcomeWord>Home.index</WelcomeWord>
      <CardContainer>
        <Card>
          <Img></Img>
          <Discription>
            <Subject>dd</Subject>
          </Discription>
        </Card>
        <Card>
          <Img></Img>
          <Discription>
            <Subject>dd</Subject>
          </Discription>
        </Card>
        <Card>
          <Img></Img>
          <Discription>
            <Subject>dd</Subject>
          </Discription>
        </Card>
      </CardContainer>
    </Container>
  );
}
