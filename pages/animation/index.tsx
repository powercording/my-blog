import { SnowFlakes } from '@components/animation/SnowFlakes';
import styled from 'styled-components';
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  :hover div:nth-child(1) {
    color: red;

    transform: skew(25deg);
  }
  :hover div:nth-child(2) {
    color: red;

    transform: skew(25deg);
  }
`;

const Div = styled.div`
  overflow: hidden;
  position: relative;
  height: 3rem;
  width: 200px;
  transition: 0.2s;
`;

const HomeBoxTop = styled(Div)`
  height: 2.44rem;
`;
const HomeBoxBottom = styled(Div)``;

const Homebefore = styled.span`
  position: absolute;
  display: block;
  font-size: 3rem;
`;
const HomeAfter = styled.span`
  position: absolute;
  display: block;
  transform: translateY(-54%);
  font-size: 3rem;
`;

export default function WebCss() {
  return (
    <>
      <PageContainer>
        <HomeBoxTop>
          <Homebefore>HOME</Homebefore>
        </HomeBoxTop>
        <HomeBoxBottom>
          <HomeAfter>HOME</HomeAfter>
        </HomeBoxBottom>
      </PageContainer>
      <SnowFlakes></SnowFlakes>
    </>
  );
}
