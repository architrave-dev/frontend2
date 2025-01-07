import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import MoleculeInput from './molecules/MoleculeInput';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnCancel } from '../../shared/component/headless/button/BtnBody';
import { AlertPosition, AlertType } from '../../shared/enum/EnumRepository';
import { useModalStore } from '../../shared/store/portal/modalStore';


const Login: React.FC = () => {
  const { isLoading, login } = useAuth();
  const { clearModal } = useModalStore();
  const { setStandardAlert } = useStandardAlertStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const isValid = () => {
    return (email !== '' && password !== '' && !emailError && !passwordError)
  }

  const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 4) {
      setPasswordError('Invalid password, min-length: 4');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Please check the format."
      })
      return;
    }
    try {
      await login({ email, password });
      clearModal();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isLoading) {
      return null;
    }
    switch (event.key) {
      case 'Enter':
        handleSubmit();
        break;
      case 'Escape':
        clearModal();
        break;
      default:
        break;
    }
  };

  return (
    <LoginComp ref={modalRef} onKeyDown={handleKeyDown} tabIndex={-1}>
      <Title>Login</Title>
      <MoleculeInput
        name={"Email"}
        validate={validateEmail}
        value={email}
        handleChange={setEmail}
        err={emailError}
        placeholder={"username@email.com"}
      />
      <MoleculeInput
        name={"Password"}
        validate={validatePassword}
        value={password}
        handleChange={setPassword}
        err={passwordError}
        placeholder={"Password"}
      />
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Login...' : 'Login'}
        </SubmitButton>
        <HeadlessBtn
          value={"Cancel"}
          handleClick={clearModal}
          StyledBtn={BtnCancel}
        />
      </ButtonContainer>
    </LoginComp>
  );
};

const LoginComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 17px 14px;
  outline: none;
`

const Title = styled.h2`
  margin-bottom: 44px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 10px 0px;
`;

const SubmitButton = styled.button`
  width: 76px;
  padding: 10px 14px;
  margin: 0 0 0 10px;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.color_Gray_06};
  background-color: ${({ theme }) => theme.colors.color_Gray_02};
  &:hover {
    color: ${({ theme }) => theme.colors.color_White};
    background-color: ${({ theme }) => theme.colors.color_Gray_03};
  }
`;

export default Login;