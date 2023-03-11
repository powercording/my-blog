import { useState } from 'react';
import tw from 'tailwind-styled-components';

const LoginContainer = tw.div`
  flex flex-col h-screen
  `
  const LoginBox = tw.div`
  group
  flex-1
  flex
bg-slate-400
justify-center items-center
cursor-pointer
`;
  const JoinBox = tw(LoginBox)`
  bg-slate-500
`;
const Font = tw.p`
  text-white font-extrabold font-mono text-7xl
 group-hover:drop-shadow-md group-hover:text-8xl transition-all
`

export default function Login() {
  const [showingWord, setShowingWord] = useState('');

  return <LoginContainer>
  <LoginBox><Font>LOGIN</Font></LoginBox>
  <JoinBox><Font>JOIN</Font></JoinBox>
  </LoginContainer>;
}
