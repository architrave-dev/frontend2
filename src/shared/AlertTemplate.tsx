import React from 'react';
import styled from 'styled-components';
import { useStandardAlertStore } from './store/portal/alertStore';
import Alert from '../Alert';
import AlertComp from '../component/alert/AlertComp';
import ConfirmComp from '../component/alert/ConfirmComp';
import { AlertType } from './enum/EnumRepository';



const AlertTemplate: React.FC = () => {
  const { standardAlert } = useStandardAlertStore();

  const renderAlert = () => {
    switch (standardAlert?.type) {
      case AlertType.ALERT:
        return <AlertComp />;
      case AlertType.CONFIRM:
        return <ConfirmComp />;
    }
  };

  if (standardAlert === null) return null;

  return (
    <Alert>
      <AlertOverlay>
        {renderAlert()}
      </AlertOverlay>
    </Alert>
  );
};


const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 2;
`;


export default AlertTemplate;