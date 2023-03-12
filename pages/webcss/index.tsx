import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const PageContainer = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover div:nth-child(1){
    color:red;
    border-bottom: .5px solid black;
    transform: skew(25deg);
    }
    :hover div:nth-child(2){
    color:red;
    border-top: 0.5px solid black;
    transform: skew(25deg) translateY(-4%)
    }
   
`;

const Div = styled.div`
  overflow: hidden;
  position: relative;
  height: 12px;
  width: 50px;
  transition: .2s;
`;

const HomeBoxTop = styled(Div)`

`
const HomeBoxBottom = styled(Div)`
   
`

const Homebefore = styled.span`
  position: absolute;
  display: block;
  transform: translateY(-4%);
`;
const HomeAfter = styled.span`
  position: absolute;
  display: block;
  transform: translateY(-54%);
`;

export default function WebCss() {
  return (
    <PageContainer>
      <HomeBoxTop>
      <Homebefore>HOME</Homebefore>
      </HomeBoxTop>
      <HomeBoxBottom>
        <HomeAfter>HOME</HomeAfter>
      </HomeBoxBottom>
    </PageContainer>
  );
}
