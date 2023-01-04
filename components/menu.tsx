import tw from 'tailwind-styled-components';

interface BlogName {
  blogName: string;
}

const NavContainer = tw.div`
  flex
  flex-col
  h-screen
  bg-gray-400
  text-2xl
  font-extrabold
  w-1/6
`;

export default function Menu({ blogName }: BlogName) {
  return <NavContainer>{blogName}</NavContainer>;
}
