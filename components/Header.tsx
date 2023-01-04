import Head from 'next/head';

interface Title {
  title: string;
}

export default function Header({ title }: Title) {
  return <Head>{title}</Head>;
}
