import { ReactNode, useEffect, useState } from 'react';
import MenuBar from './menu';
import tw from 'tailwind-styled-components';
import styled, { keyframes } from 'styled-components';
import useUser from '@libs/client/useUser';

interface LayoutProps {
  children: ReactNode;
}

const Container = tw.div`
  flex
  flex-col
  h-screen
`;

const ContentArea = tw.div`
  w-full h-[calc(100%-56px)] flex flex-row relative
`;

const MenuAnime = styled.div<{ open: boolean }>`
  rotate: ${props => (props.open ? 'x 0deg' : 'x 90deg')};
  transform-origin: top;
`;

const MenuContainer = tw(MenuAnime)`
  py-10 w-screen lg:w-1/3 xl:w-1/4 2xl:w-1/5 lg:relative
  text-center bg-white border-b lg:border-r 
  lg:h-full
  text-xl
  font-sans
  absolute 
  z-10
`;

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);
  const { name } = useUser();

  useEffect(() => {
    const resizeMenu = () => {
      if (innerWidth >= 1024 && !open) {
        setOpen(true);
      } else if (innerWidth <= 1024 && open) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', resizeMenu);
  }, []);

  return (
    <Container>
      <MenuBar blogName="My-blog" user={name} setMenuState={setOpen}></MenuBar>
      <ContentArea>
        <MenuContainer open={open}>category at Layout</MenuContainer>
        {children}
      </ContentArea>
    </Container>
  );
}
