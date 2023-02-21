import tw from 'tailwind-styled-components';

const Card = tw.div`
  box-border flex flex-col p-4 relative
  w-96
  h-56 top-6 bottom-14 bg-white  rounded-md
  hover:cursor-pointer shadow-slate-400 shadow
  transition-all shrink-0 
  hover:scale-[1.02]
`;

const Img = tw.img`
  rounded-lg absolute top-0 left-0 right-0 bottom-0
  blur-sm
`;

const Discription = tw.div`
  top-[5%] bottom-[5%] left-[8%] right-[8%] flex 
  flex-col justify-end
  items-start
`;

const Subject = tw.h1`
  font-extrabold
`;

type PostType = {
  sub: string;
  [key: string]: any;
};

export default function Post({ sub, ...rest }: PostType) {
  return (
    <Card {...rest}>
      <Discription>
        <Subject>{sub}</Subject>
      </Discription>
      <Img />
    </Card>
  );
}
