import Link from 'next/link';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

interface BlogName {
  blogName: string;
  user: string;
}

const NavContainer = tw.div<{ $displayHidden: boolean }>`
  py-10 w-screen md:w-2/5 lg:w-1/3 xl:w-1/4 2xl:w-1/5 absolute z-10
  text-center bg-white border
  h-screen
  text-xl
  font-sans
  
  ${props => (props.$displayHidden ? 'flex flex-col' : 'hidden')}
`;

const NameTag = tw.p`
  text-base
`;

const Category = tw.div`
  mx-auto
  mt-5
  h-[200px]
`;

const LoginOrJoin = tw(NameTag)`
  mx-auto
  mt-auto
  flex
  gap-2
`;

const Button = tw.button<{ $show: boolean | string }>`
  ${props => (props.$show ? '' : 'hidden')}
  w-full h-8
  bg-gray-300
  rounded-md
  hover:bg-gray-400
  font-bold
  text-gray-700
`;

const KakaoButton = tw(Button)`
  bg-yellow-200
  hover:bg-yellow-100
`;

const GithubButton = tw(Button)`
  bg-gray-800 text-white
  hover:bg-gray-500
`;

const Hamberger = tw.div`
w-10 h-10 flex flex-col gap-2 z-20 cursor-pointer
top-3 absolute left-4 p-2
`;

const HamLine = tw.span`
block w-8 h-1 bg-slate-500
`;

//TODO: 카카오 로그인과 깃헙 버튼 CSS 수정.
//TODO: 카카오 로그인 api 구현 세부화와 깃허브 api 로그인 구현
export default function Menu({ blogName, user }: BlogName) {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenu = () => {
    setToggleMenu(prev => !prev);
  };

  return (
    <>
      <Hamberger onClick={handleMenu}>
        {toggleMenu ? (
          <>
            <HamLine className="rotate-45 translate-y-3" />
            <HamLine className="-rotate-45" />
          </>
        ) : (
          <>
            <HamLine />
            <HamLine />
            <HamLine />
          </>
        )}
      </Hamberger>
      <NavContainer $displayHidden={toggleMenu}>
        <Link href="/" onClick={handleMenu}>
          <h1>{blogName}</h1>
        </Link>
        <NameTag>{user}</NameTag>
        <Category>category here</Category>
        <LoginOrJoin>
          <Link href="login" onClick={handleMenu}>
            <span>로그인</span>
          </Link>
          /
          <Link href="join" onClick={handleMenu}>
            <span>가입</span>
          </Link>
        </LoginOrJoin>
        <div className="flex flex-col gap-2 py-3 items-center">
          <Link href="api/login/kakaoLogin" className="w-1/2 md:w-3/4">
            <KakaoButton $show={true}>kakao</KakaoButton>
          </Link>
          <Link href="" className="w-1/2 md:w-3/4">
            <GithubButton $show={true}>github</GithubButton>
          </Link>
        </div>
      </NavContainer>
    </>
  );
}
