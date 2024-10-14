import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { ModalType, useModalStore } from '../../shared/store/portal/modalStore';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputAuth } from '../../shared/component/headless/input/InputBody';


const Login: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);
  const { isLoading, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValid = () => {
    return (email !== '' && password !== '' && !emailError && !passwordError)
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 4) {
      setPasswordError('Invalid password, min-length: 4');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      try {
        await login({ email, password });
        setModalType(ModalType.NONE);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <LoginComp>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <InputWrapper onBlur={() => validateEmail(email)}>
            <HeadlessInput
              type={"text"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              placeholder={"username@email.com"}
              StyledInput={InputAuth}
            />
            {emailError && <ErrorIcon>!</ErrorIcon>}
          </InputWrapper>
          <ErrorText>{emailError}</ErrorText>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <InputWrapper onBlur={() => validatePassword(password)}>
            <HeadlessInput
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              placeholder={"Password"}
              StyledInput={InputAuth}
            />
            {passwordError && <ErrorIcon>!</ErrorIcon>}
          </InputWrapper>
          <ErrorText>{passwordError}</ErrorText>
        </div>
        {/* {apiError && <ErrorText>{apiError}</ErrorText>} */}
        <ButtonContainer>
          <SubmitButton type="submit" $isValid={isValid()} disabled={isLoading}>
            {isLoading ? 'Login...' : 'Login'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => setModalType(ModalType.NONE)}>Cancel</CancelButton>
        </ButtonContainer>
      </form>
    </LoginComp>
  );
};

const LoginComp = styled.div`
  height: 360px;
  padding: 17px 14px;
`

const Title = styled.h2`
  margin-bottom: 44px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_1};
`

const ErrorIcon = styled.span`
  position: absolute;
  right: 17px;
  bottom: 17px;
  color: ${({ theme }) => theme.colors.color_alert_red};
  ${({ theme }) => theme.typography.Body_04};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.color_alert_red};
  margin-bottom: 10px;
  min-height: 18px; // Ensures consistent height even when empty
  ${({ theme }) => theme.typography.Body_04};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 76px;
  padding: 10px 14px;
  margin: 0 0 0 10px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`;

const SubmitButton = styled(Button) <{ $isValid: boolean }>`
  background-color: ${props => props.$isValid ? props.theme.colors.color_Gray_03 : props.theme.colors.color_Gray_05};
  color: ${props => props.$isValid ? '#fff' : '#333'};
  &:hover {
    background-color: ${props => props.$isValid ? props.theme.colors.color_Gray_02 : props.theme.colors.color_Gray_05};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.color_Alpha_03};
  color: ${({ theme }) => theme.colors.color_Gray_04};
  &:hover {
    color: ${({ theme }) => theme.colors.color_Gray_03};
  }
`;

export default Login;