import React from 'react';
import styled from 'styled-components';


const Loading = (): React.ReactElement => {
  return (
    <LoadingComp>
      Loading...
    </LoadingComp>
  );
};

const LoadingComp = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;


export default Loading;