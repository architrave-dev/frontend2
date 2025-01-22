import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTempAlertStore } from './store/portal/tempAlertStore';
import TempAlert from '../portal/TempAlert';
import TempAlertComp from '../component/tempAlert/TempAlertComp';


const TempAlertTemplate: React.FC = () => {
  const { tempAlert } = useTempAlertStore();

  if (tempAlert === null) return null;

  return (
    <TempAlert>
      {/* <TempAlertOverlay> */}
      <TempAlertComp />
      {/* </TempAlertOverlay> */}
    </TempAlert>
  );
};


const TempAlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 2;
`;


export default TempAlertTemplate;
