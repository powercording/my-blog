import { ReactNode } from 'react';
import Menu from './menu';
import tw from 'tailwind-styled-components';

interface LayoutProps {
  children: ReactNode;
}

const Container = tw.div`
  flex
  flex-row
  h-screen
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Menu blogName="My-blog"></Menu>
      {children}
    </Container>
  );
}
