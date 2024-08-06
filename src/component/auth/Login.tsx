import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalType, useAuthStore } from '../../shared/store';


const Login: React.FC = () => {
  const setModalType = useAuthStore((state) => state.setModalType);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      console.log('Login attempt with:', email, password);
      setIsLoggedIn(true);
      setModalType(ModalType.NONE);
    }
  };

  return (
    <>
      <Title>로그인</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            $hasError={!!emailError}
            placeholder="이메일을 입력해 주세요."
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            $hasError={!!passwordError}
            placeholder="비밀번호를 입력해 주세요."
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </div>
        <ButtonContainer>
          <Button onClick={() => setModalType(ModalType.NONE)}>취소</Button>
          <Button type="submit" $primary>로그인</Button>
        </ButtonContainer>
      </form>
    </>
  );
};


const Title = styled.h2`
  margin-bottom: 20px;
`;

interface InputProps {
  $hasError?: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.$hasError ? 'red' : '#ccc'};
  border-radius: 4px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

interface ButtonProps {
  $primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.$primary ? '#333' : '#ccc'};
  color: ${props => props.$primary ? 'white' : 'black'};
`;

export default Login;