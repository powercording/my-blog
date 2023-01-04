import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full bg-red-200 h-[100vh] ">
      <Component {...pageProps} />
    </div>
  );
}
