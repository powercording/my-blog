import { ReactNode, useState } from 'react';
import MenuBar from './SideBar';
import tw from 'tailwind-styled-components';
import useUser from '@libs/client/useUser';

interface LayoutProps {
  children: ReactNode;
}

const Container = tw.div`
  flex
  h-screen
`;

const ContentArea = tw.div`
  w-full h-[calc(100%-56px)]
`;

const MenuList = tw.p`
  cursor-pointer
`;

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);
  const user = useUser();

  return (
    <Container>
      <MenuBar
        blogName="My-blog"
        user={user?.name}
        menuState={open}
        setMenuState={setOpen}
      >
        <MenuList>about me</MenuList>
        <MenuList>blabla</MenuList>
        <MenuList>css</MenuList>
        <MenuList>animation</MenuList>
        <MenuList>code</MenuList>
      </MenuBar>
      <ContentArea>{children}</ContentArea>
    </Container>
  );
}
