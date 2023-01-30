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
  bg-gray-50
  text-xl
  font-sans
  w-1/6
`;

const NameTag = tw.p`
  text-base
`;

const Category = tw.div`
border-2
  mx-auto
  mt-5
  h-[150px]
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
      <div className="flex gap-2 py-3">
        <Link href="api/login/kakaoLogin" className="w-full">
          <KakaoButton $show={true}>kakao Login</KakaoButton>
        </Link>
        <Link href="" className="w-full">
          <GithubButton $show={true}>github Login</GithubButton>
        </Link>
      </div>
    </NavContainer>
  );
}
