import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(response => response.json()),
      }}
    >
      <Layout>
        {/* //todo: 클릭시 홈페이지로 이동 */}
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
