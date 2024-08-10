import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalType, useAuthStore } from '../../shared/store';
import { useAuth } from '../../shared/hooks/useAuth';


const Login: React.FC = () => {
  const setModalType = useAuthStore((state) => state.setModalType);
  const { isLoading, error: apiError, login } = useAuth();

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
      setEmailError('올바른 이메일 주소를 입력해주세요.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
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
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">이메일</Label>
          <InputWrapper>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              placeholder="이메일을 입력해 주세요."
              $hasError={!!emailError}
            />
            {emailError && <ErrorIcon>!</ErrorIcon>}
          </InputWrapper>
          <ErrorText>{emailError}</ErrorText>
        </div>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <InputWrapper>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validatePassword(password)}
              placeholder="비밀번호를 입력해 주세요."
              $hasError={!!passwordError}
            />
            {passwordError && <ErrorIcon>!</ErrorIcon>}
          </InputWrapper>
          <ErrorText>{passwordError}</ErrorText>
        </div>
        {apiError && <ErrorText>{apiError}</ErrorText>}
        <ButtonContainer>
          <SubmitButton type="submit" $isValid={isValid()} disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => setModalType(ModalType.NONE)}>취소</CancelButton>
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
  font-size: ${({ theme }) => theme.fontSize.font_B01};
  font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  color: ${({ theme }) => theme.colors.color_Gray_02};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.color_Gray_03};
`

const Input = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.$hasError ? 'red' : '#ccc'};
  border-radius: 1px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.color_Gray_02};
    outline: none;
  }
`;

const ErrorIcon = styled.span`
  position: absolute;
  right: 17px;
  bottom: 17px;
  color: ${({ theme }) => theme.colors.color_alert_red};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.color_alert_red};
  font-size: ${({ theme }) => theme.fontSize.font_B04};
  margin-bottom: 10px;
  min-height: 18px; // Ensures consistent height even when empty
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