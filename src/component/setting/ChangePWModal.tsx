import React, { useState } from 'react';
import styled from 'styled-components';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { SettingPWInput } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnModalMain, BtnModalSub } from '../../shared/component/headless/button/BtnBody';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useValidation } from '../../shared/hooks/useValidation';
import Space from '../../shared/Space';
import { useMember } from '../../shared/hooks/useApi/useMember';
import { useAui } from '../../shared/hooks/useAui';
import { useAuth } from '../../shared/hooks/useApi/useAuth';


const ChangePWModal: React.FC = () => {
  const { aui } = useAui();
  const { user } = useAuth();
  const { standardModal, isClosing, clearModal } = useModalStore();
  const { updatePassword } = useMember();
  const { isValidPassword } = useValidation();
  const [pw, setPw] = useState(standardModal?.value || "");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [error, setError] = useState('');


  if (user == null || standardModal == null) return null;

  const handleChange = () => {
    if (validatePassword() && validateConfirmPassword()) {
      updatePassword(aui, {
        id: user.id,
        password: pw,
        newPassword: newPw,
      });
    }
  };

  const validatePassword = () => {
    if (pw === newPw) {
      setError('New password cannot be the same as the current one');
      return false;
    }
    if (!isValidPassword(newPw)) {
      setError('Invalid password, min-length: 4');
      return false;
    }
    setError('');
    return true;
  };

  const validateConfirmPassword = () => {
    if (newPw !== newPwConfirm) {
      setError('New passwords does not match');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <ChangeModalFrame
      onClick={(e) => e.stopPropagation()}
      $isClosing={isClosing}
    >
      <ChangeModalComp>
        <Title>Change Password</Title>
        <HeadlessInput
          type={'password'}
          value={pw}
          handleChange={(e) => setPw(e.target.value)}
          placeholder={"Enter Current Password"}
          StyledInput={SettingPWInput}
        />
        <HeadlessInput
          type={'password'}
          value={newPw}
          handleChange={(e) => setNewPw(e.target.value)}
          placeholder={"Create New Password"}
          StyledInput={SettingPWInput}
        />
        <HeadlessInput
          type={'password'}
          value={newPwConfirm}
          handleChange={(e) => setNewPwConfirm(e.target.value)}
          placeholder={"Confirm new password"}
          StyledInput={SettingPWInput}
        />
        <Space $height="20px">
          {error && <ErrorText>{error}</ErrorText>}
        </Space>
        <BtnContainer>
          <HeadlessBtn
            value={"Change"}
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
    </ChangeModalFrame>
  );
};

export const ChangeModalFrame = styled.div<{ $isClosing: boolean }>`
  padding: 20px;
  width: 440px;
  height: fit-content;
  border-radius: 1px;
  backdrop-filter: blur(4px);
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  background-color: ${({ theme }) => theme.colors.color_Alpha_03};
  
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
  margin-bottom: 34px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1vw;
`

const ErrorText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.color_alert_red};
  ${({ theme }) => theme.typography.Body_04};
`;

export default ChangePWModal; 