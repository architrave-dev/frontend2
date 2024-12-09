import React from 'react';
import styled from 'styled-components';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';


const ConfirmComp: React.FC = () => {
  const { standardAlert, clearAlert } = useStandardAlertStore();

  if (!standardAlert) return null;

  const handleOK = async () => {
    clearAlert();
  };

  const handleCallback = () => {
    if (standardAlert.callBack) {
      standardAlert.callBack();
    }
    clearAlert();
  }

  return (
    <ConfirmContent>
      <Title>Wait..</Title>
      <Content>{standardAlert.content}</Content>
      <ButtonContainer>
        {standardAlert.callBack ?
          <>
            <Button onClick={handleCallback}>OK</Button>
            <Button onClick={handleOK}>Cancel</Button>
          </>
          :
          <Button onClick={handleOK}>OK</Button>
        }
      </ButtonContainer>
    </ConfirmContent>
  );
};


const Title = styled.h2`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;
const Content = styled.div`
  margin-bottom: 44px;
  white-space: pre-line;
  line-height: 20px;
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 76px;
  padding: 10px 14px;
  margin: 0 0 0 10px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
    &:hover {
    background-color: ${props => props.theme.colors.color_Gray_05};
  }
`;

const ConfirmContent = styled.div`
  position: fixed;
  top: calc(10vh);
  left: 50%;
  transform: translateX(-50%);
  min-width: 500px;
  min-height: 50px;
  width: fit-content;
  height: fit-content;

  padding: 20px;

  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  border-radius: 2px;
  backdrop-filter: blur(4px);
  background-color: ${({ theme }) => theme.colors.color_Alpha_04}
`;

export default ConfirmComp;