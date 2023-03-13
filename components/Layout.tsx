import { ReactNode, useState } from 'react';
import MenuBar from './SideBar';
import tw from 'tailwind-styled-components';
import useUser from '@libs/client/useUser';
import Link from 'next/link';

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
        <Link href="about">
          <MenuList>about me</MenuList>
        </Link>
        <MenuList>blabla</MenuList>
        <Link href="webcss">
          <MenuList>css</MenuList>
        </Link>
        <Link href="animation">
          <MenuList>animation</MenuList>
        </Link>
        <Link href="code">
          <MenuList>code</MenuList>
        </Link>
      </MenuBar>
      <ContentArea>{children}</ContentArea>
    </Container>
  );
}
