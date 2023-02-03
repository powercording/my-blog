import Post from '@components/Post';
import useUser from '@libs/client/useUser';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex-col
  h-full
  w-full
`;
const WelcomeWord = tw.h1`
  font-extrabold inline
`;

const CardContainer = tw.div`
  overflow-x-hidden relative rounded-xl
  flex h-full gap-2 w-[50%] 
`;

const PageNation = tw.ul`
  list-none absolute left-[50%] translate-x-[-50%]
  flex gap-3 cursor-pointer bottom-0
`;

const test = [
  { sub: '이상돈', id: 1 },
  { sub: '김종찬', id: 2 },
  { sub: '심규영', id: 3 },
  { sub: '천왕역', id: 4 },
  { sub: '오류동역', id: 5 },
  { sub: '강남역', id: 6 },
  { sub: '불고기', id: 7 },
  { sub: '치킨', id: 8 },
  { sub: '족발', id: 9 },
  { sub: '뉴발란스', id: 10 },
  { sub: '나이키', id: 11 },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const user = useUser();
  const CONTENT_PER_PAGE = 3;
  const postSize = test.length - CONTENT_PER_PAGE;

  useEffect(() => {
    const posts = document.querySelectorAll('#post');
    const slideWidth = posts[0].clientWidth;
    const pagenation = document.querySelector('#pagenation');

    posts.forEach((post, index) => {
      if (index === 0) return;
      post.setAttribute('style', `left:${slideWidth * index - 20 * index}px`);
    });

    for (let page = 1; page <= postSize; page++) {
      if (page === 1) pagenation!.innerHTML += '<li classList="active">•<li>';
      else pagenation!.innerHTML += '<li>•<li>';
    }
  }, []);

  return (
    <Container>
      <WelcomeWord>Post</WelcomeWord>
      <CardContainer>
        {test.map(post => (
          <Post key={post.id} sub={post.sub} id={'post'} className={'card'} />
        ))}
        <PageNation id="pagenation" />
      </CardContainer>
    </Container>
  );
}
