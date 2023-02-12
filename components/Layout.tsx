import { ReactNode, useState } from 'react';
import MenuBar from './menu';
import tw from 'tailwind-styled-components';
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
  w-full h-[calc(100%-56px)]
`;

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);
  const { name } = useUser();

  return (
    <Container>
      <MenuBar
        blogName="My-blog"
        user={name}
        menuState={open}
        setMenuState={setOpen}
      ></MenuBar>
      <ContentArea>{children}</ContentArea>
    </Container>
  );
}
