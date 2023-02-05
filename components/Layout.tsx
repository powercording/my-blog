import { ReactNode } from 'react';
import Menu from './menu';
import tw from 'tailwind-styled-components';
import useUser from '@libs/client/useUser';

interface LayoutProps {
  children: ReactNode;
}

const Container = tw.div`
  flex
  flex-row
  h-screen
`;

const ContentArea = tw.div`
  py-10
  px-8
  w-full
  gird
`;

export default function Layout({ children }: LayoutProps) {
  const { name } = useUser();
  return (
    <Container>
      <Menu blogName="My-blog" user={name}></Menu>
      <ContentArea>{children}</ContentArea>
    </Container>
  );
}
