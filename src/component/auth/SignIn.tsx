import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { ModalType } from '../../shared/enum/EnumRepository';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { isLoading, signUp } = useAuth();
  const setModalType = useModalStore((state) => state.setModalType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp({ email, password, username });
  };

  return (
    <SignUpComp>
      <Title>회원가입</Title>
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <InputField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="사용자 이름"
          required
        />
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : '회원가입'}
        </SubmitButton>
      </form>
      <ToggleText onClick={() => setModalType(ModalType.LOGIN)}>
        이미 계정이 있으신가요? 로그인
      </ToggleText>
    </SignUpComp>
  );
};

const SignUpComp = styled.div`
  /* Add your styles here */
`;

const Title = styled.h2`
  /* Add your styles here */
`;

const InputField = styled.input`
  /* Add your styles here */
`;

const SubmitButton = styled.button`
  /* Add your styles here */
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.color_alert_red};
  margin-bottom: 10px;
`;

const ToggleText = styled.p`
  /* Add your styles here */
`;

export default SignIn;