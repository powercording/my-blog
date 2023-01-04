import '../styles/globals.css';
import type { AppProps } from 'next/app';
import tw from 'tailwind-styled-components';
import Menu from '../components/menu';
const Container = tw.div`
  flex
  flex-row
`;

const Layout = tw.div`
  bg-slate-800 h-screen w-[200px] py-10 px-3
  text-white font-extrabold text-2xl
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Layout>
        my-blog
        <br />
        <Menu></Menu>
      </Layout>
      {/* //todo: 클릭시 홈페이지로 이동 */}
      <Component {...pageProps} />
    </Container>
  );
}
