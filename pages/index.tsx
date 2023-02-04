import Post from '@components/Post';
import useUser from '@libs/client/useUser';
import { useEffect, useState } from 'react';
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

const li = (color: string) => {
  return `<li
      class="transition-all pagenationButton p-1 text-${color}-300"
    >▢</li>`;
};

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
  const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   const startingPost = 2;
  //   const pagenaionEnd = test.length - startingPost;

  //   const posts = document.querySelectorAll('#post');
  //   const pagenation = document.querySelector('pagenation');
  //   const postWidth = posts[0]?.clientWidth;

  //   posts.forEach((post, index) => {
  //     const postLocation = postWidth * index;
  //     const indentPixel = 20 * index;
  //     const distance = postLocation - indentPixel;

  //     post.classList.add(`left-[${distance}px]`);
  //   });
  // }, []);

  useEffect(() => {
    const startingPost = 2;
    const pagenaionEnd = test.length - startingPost;

    const posts = document.querySelectorAll('#post');
    const pagenation = document.querySelector('#pagenation');
    const postWidth = posts[0]?.clientWidth;

    posts.forEach((post, index) => {
      const postLocation = postWidth * index;
      const indentPixel = 20 * index;
      const distance = postLocation - indentPixel;
      if (index === 0) return;
      post.setAttribute('style', `left:${distance}px`);
    });

    for (let page = 0; page <= pagenaionEnd; page++) {
      if (page === 0) {
        pagenation!.innerHTML += li('red');
      } else {
        pagenation!.innerHTML += li('gray');
      }
    }

    const pagenationColorSet = (arr: NodeListOf<Element>) => {
      arr.forEach(list => {
        list.classList.remove('text-red-300');
        list.classList.add('text-gray-300');
      });
    };

    const slide = (index: number) => {
      posts.forEach((post, postIndex) => {
        const indentedWidth = postWidth - 20;
        const postLocation = postWidth * postIndex;
        const indentPixel = 20 * postIndex;
        const distance = postLocation - indentPixel;
        const moveSize = index * indentedWidth;
        post.setAttribute('style', `left:${distance - moveSize}px`);
      });
    };

    const pagenationButtons = document.querySelectorAll('.pagenationButton');

    pagenationButtons.forEach((li, index, arr) => {
      li.addEventListener('click', () => {
        pagenationColorSet(arr);
        li.classList.remove('text-gray-300');
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
