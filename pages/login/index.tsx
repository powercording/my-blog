import { useState } from 'react';
import tw from 'tailwind-styled-components';
import JoinForm from './Joinform';
import LoginForm from './LoginForm';

const LoginContainer = tw.div`
  flex flex-col h-screen relative 
  `;
const LoginLayOut = tw.div<{ $loginClick: boolean | null }>`
absolute 
flex flex-col justify-center items-center
 transition-all
w-full
h-[50%]
${props =>
  props.$loginClick === true ? 'h-full z-10 justify-start-start' : 'group cursor-pointer'}
${props => (props.$loginClick === false ? 'invisible' : '')}
`;
const LoginBox = tw(LoginLayOut)`
bg-slate-400
  top-0
`;
const JoinBox = tw(LoginLayOut)`
bottom-0
  bg-slate-500
`;
const Font = tw.p<{ $loginClick: boolean | null }>`
  text-white font-extrabold font-mono text-6xl
 group-hover:drop-shadow-md group-hover:text-7xl transition-all
 ${props => (props.$loginClick ? 'absolute opacity-10' : '')}
`;
const ResetButton = tw.button`
z-20 mt-auto h-16 border text-white rounded-md
font-mono
`;
export default function Login() {
  const [loginClick, setLoginClick] = useState<boolean | null>(null);
  const [joinClick, setJoinClick] = useState<boolean | null>(null);

  const handleLoginClick = () => {
    setLoginClick(() => true);
    setJoinClick(() => false);
  };

  const handleJoinClick = () => {
    setLoginClick(() => false);
    setJoinClick(() => true);
  };

  const handleReset = () => {
    setLoginClick(null);
    setJoinClick(null);
  };

  return (
    <LoginContainer>
      <LoginBox $loginClick={loginClick} onClick={handleLoginClick}>
        <Font $loginClick={loginClick}>LOGIN</Font>
        {loginClick && <LoginForm></LoginForm>}
      </LoginBox>
      <JoinBox $loginClick={joinClick} onClick={handleJoinClick}>
        <Font $loginClick={joinClick}>JOIN</Font>
        {joinClick && <JoinForm></JoinForm>}
      </JoinBox>
      {(loginClick || joinClick) && (
        <ResetButton type="button" onClick={handleReset}>
          돌아가기
        </ResetButton>
      )}
    </LoginContainer>
  );
}
