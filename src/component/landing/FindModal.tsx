import React, { useState } from 'react';
import styled from 'styled-components';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { SettingInput } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnModalMain, BtnModalSub } from '../../shared/component/headless/button/BtnBody';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useValidation } from '../../shared/hooks/useValidation';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import Space from '../../shared/Space';


const FindModal: React.FC = () => {
  const { standardModal, isClosing, clearModal } = useModalStore();
  const { findAui } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isEmail } = useValidation();

  if (standardModal == null) return null;

  const handleChange = () => {
    if (!validateEmail()) return;
    findAui({ email, password });
  };

  const validateEmail = () => {
    if (!isEmail(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <FindModalFrame
      onClick={(e) => e.stopPropagation()}
      $isClosing={isClosing}
    >
      <ChangeModalComp>
        <Title>Find {standardModal.title}</Title>
        <HeadlessInput
          type={'text'}
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          placeholder={"Enter Email"}
          StyledInput={SettingInput}
        />
        <HeadlessInput
          type={'password'}
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          placeholder={"Enter Password"}
          StyledInput={SettingInput}
        />
        <Space $height="20px">
          {error && <ErrorText>{error}</ErrorText>}
        </Space>
        <BtnContainer>
          <HeadlessBtn
            value={"Find"}
            handleClick={handleChange}
            StyledBtn={BtnModalMain}
          />
          <HeadlessBtn
            value={"Cancel"}
            handleClick={clearModal}
            StyledBtn={BtnModalSub}
          />
        </BtnContainer>
      </ChangeModalComp>
    </FindModalFrame>
  );
};

export const FindModalFrame = styled.div<{ $isClosing: boolean }>`
  padding: 20px;
  width: 440px;
  height: fit-content;
  border-radius: 1px;
  backdrop-filter: blur(6px);
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  background-color: ${({ theme }) => theme.colors.color_Alpha_05};
  
  opacity: ${({ $isClosing }) => ($isClosing ? 0 : 1)};
  transform: ${({ $isClosing }) => ($isClosing ? 'scale(0.8)' : 'scale(1)')};
  
  transition: all 0.3s ease-in;
  animation: ${({ $isClosing }) => ($isClosing ? 'none' : 'popIn 0.4s ease-out')};
  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ChangeModalComp = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2vh 1vw;
`

const Title = styled.h2`
  margin-bottom: 44px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1vw;

  margin-top: 0.5vh;
`

const ErrorText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.color_alert_red};
  ${({ theme }) => theme.typography.Body_04};
  animation: shake 0.4s ease-in-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0);}
    20% { transform: translateX(-4px);}
    40% { transform: translateX(4px);}
    60% { transform: translateX(-3px);}
    80% { transform: translateX(3px);}
  }
`;

export default FindModal;