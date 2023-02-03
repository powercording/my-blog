import tw from 'tailwind-styled-components';

const Card = tw.div`
  box-border flex flex-col p-5 gap-5
  w-80 top-0 bottom-14 bg-white border-gray-300 border-2 rounded-xl
  hover:cursor-pointer shadow-slate-400 shadow-md
  absolute items-start flex-shrink-0 transition-all
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

type PostType = {
  sub: string;
  [key: string]: any;
};

export default function Post({ sub, ...rest }: PostType) {
  return (
    <>
      <Card {...rest}>
        <Img />
        <Discription>
          <Subject>{sub}</Subject>
        </Discription>
      </Card>
    </>
  );
}
