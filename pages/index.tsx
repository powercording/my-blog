import Post from '@components/Post';
import useUser from '@libs/client/useUser';
import { useEffect } from 'react';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex-col p-5
  h-full w-full
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
  const user = useUser();

  useEffect(() => {
    const posts = document.querySelectorAll('#post');
    const pagenation = document.querySelector('#pagenation');
    const startingContent = 2;
    const slideWidth = posts[0].clientWidth;
    const postSize = test.length - startingContent;

    posts.forEach((post, index) => {
      const originPosition = slideWidth * index;
      const postIndent = 20 * index;
      if (index === 0) return;
      post.setAttribute('style', `left:${originPosition - postIndent}px`);
    });

    for (let page = 0; page <= postSize; page++) {
      if (page === 0)
        pagenation!.innerHTML +=
          '<li class="text-red-300  transition-all pagenationButton p-1">•<li>';
      else
        pagenation!.innerHTML +=
          '<li class="transition-all pagenationButton p-1 text-gray-500">•<li>';
    }

    const pagenationColorSet = (arr: NodeListOf<Element>) => {
      arr.forEach(list => {
        list.classList.remove('text-red-300');
        list.classList.add('text-gray-500');
      });
    };

    const slide = (index: number) => {
      posts.forEach((post, postIndex) => {
        const originPosition = slideWidth * postIndex;
        const postIndent = 20 * postIndex;
        const postWidth = slideWidth - 20;
        const moveSize = index * postWidth;

        post.setAttribute(
          'style',
          `left:${originPosition - postIndent - moveSize}px`,
        );
      });
    };

    const pagenationButtons = document.querySelectorAll('.pagenationButton');

    pagenationButtons.forEach((li, index, arr) => {
      li.addEventListener('click', () => {
        pagenationColorSet(arr);
        li.classList.add('text-red-300');
        slide(index);
      });
    });
  }, []);

  return (
    <Container>
      <WelcomeWord>Posts</WelcomeWord>
      <CardContainer>
        {test.map(post => (
          <Post key={post.id} sub={post.sub} id={'post'} className={'card'} />
        ))}
        <PageNation id="pagenation" />
      </CardContainer>
    </Container>
  );
}
