import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {/* //todo: 클릭시 홈페이지로 이동 */}
      <Component {...pageProps} />
    </Layout>
  );
}
