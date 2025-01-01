// Arrow.tsx
import React from 'react';
import styled from 'styled-components';

const ArrowIcon = styled.svg`
  width: fit-content;
  height: 100%; // 부모 크기에 맞게 조절

  line {
    stroke: black;
    stroke-width: 3;
  }
`;

// 컴포넌트
const Arrow: React.FC = () => {
  return (
    <ArrowIcon viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="40" x2="40" y2="10" />
      <line x1="40" y1="10" x2="20" y2="10" />
      <line x1="40" y1="10" x2="40" y2="30" />
    </ArrowIcon>
  );
};

export default Arrow;
