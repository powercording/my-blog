import Post from '@components/Post';
import useUser from '@libs/client/useUser';
import { useEffect } from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex-col
  h-full
  w-full
`;
const WelcomeWord = tw.h1`
  font-extrabold
`;

const CardContainer = tw.div`
  overflow-x-hidden relative rounded-xl
  flex h-full gap-2 w-[50%]
`;

const test = [
  { sub: '이상돈', id: 1 },
  { sub: '김종찬', id: 2 },
  { sub: '심규영', id: 3 },
  { sub: '천왕역', id: 4 },
  { sub: '오류동역', id: 5 },
];

export default function Home() {
  const user = useUser();

  const postSize = 5;
  let currentPost = 1;

  useEffect(() => {
    const posts = document.querySelectorAll('#post');
    const slideWidth = posts[0].clientWidth;
    console.log(slideWidth);
    // posts[0].classList.add('left-2');
    posts.forEach((post, index) => {
      if (index === 0) return;
      post.setAttribute('style', `left:${slideWidth * index - 20 * index}px`);
    });
  }, []);

  return (
    <Container>
      <WelcomeWord>Post</WelcomeWord>
      <CardContainer>
        {test.map(post => (
          <Post
            key={post.id}
            sub={post.sub}
            id={'post'}
            className={'card'}
          ></Post>
        ))}
      </CardContainer>
    </Container>
  );
}
