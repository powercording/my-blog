import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const PageContainer = tw.div`
    flex justify-center
`;

const HOME = styled.span`
  position: relative;

  ::after,
  ::before {
    /* position: absolute; */
    color: red;
    overflow: hidden;
  }
  ::before {
    cursor: pointer;
  }

  ::after {
    cursor: pointer;
  }

  &::before {
    content: 'HOME';
    transform-origin: top;
  }
  &::after {
    content: 'HOME';
    transform-origin: bottom;
  }
`;

export default function WebCss() {
  return (
    <PageContainer>
      <HOME></HOME>
    </PageContainer>
  );
}
