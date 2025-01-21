import React from 'react';
import styled from 'styled-components';

const EmptyWorkList: React.FC = () => {
  return (
    <EmptyWorkListContainer>
      The container is currently empty. <br />
      Archive your works to proceed.
    </EmptyWorkListContainer>
  );
};

export default EmptyWorkList;

const EmptyWorkListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${({ theme }) => theme.typography.Body_03_2};
`;
