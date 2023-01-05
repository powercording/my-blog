import Link from 'next/link';
import tw from 'tailwind-styled-components';

interface BlogName {
  blogName: string;
}

const NavContainer = tw.div`
  py-10
  text-center
  flex
  flex-col
  h-screen
  bg-gray-100
  text-xl
  font-sans
  w-1/6
`;

const NameTag = tw.p`
  text-base
`;

const Category = tw.div`
  border-red-500
  border-2
  mx-auto
  mt-5
  h-[150px]
`;

const LoginOrJoin = tw(NameTag)`
border-red-500
  border-2
  mx-auto
  mt-auto
  flex
  gap-2
`;

export default function Menu({ blogName }: BlogName) {
  return (
    <NavContainer>
      <Link href="/">{blogName}</Link>
      <NameTag>name here</NameTag>
      <Category>category here</Category>
      <LoginOrJoin>
        <Link href="login">
          <span>로그인</span>
        </Link>
        /
        <Link href="join">
          <span>가입</span>
        </Link>
      </LoginOrJoin>
    </NavContainer>
  );
}
