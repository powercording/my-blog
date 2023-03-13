import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const SnowFlakesContainer = styled.div`
  width: calc(100dvw - 199px);
  height: 300px;
  background-color: black;
  position: relative;
`;

const fall = keyframes`
from{}
to{ 
  transform: translateY(300px);
}
`;

const SnowFlake = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: -8px;
  animation: ${fall} 5s infinite;
`;

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const windowWidth = global.innerWidth;

export function SnowFlakes() {
  console.log(windowWidth);
  return (
    <SnowFlakesContainer>
      <SnowFlake></SnowFlake>
    </SnowFlakesContainer>
  );
}
