import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { ModalType } from '../../shared/enum/EnumRepository';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useLoadingStore } from '../../shared/store/loadingStore';


const SignIn: React.FC = () => {
  const { signUp } = useAuth();
  const { isLoading } = useLoadingStore();
  const { setStandardModal } = useModalStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp({ email, password, username });
  };

  const openLoginModal = () => {
    setStandardModal({
      modalType: ModalType.LOGIN,
      title: null,
      value: null,
      handleChange: () => { }
    });
  }

  return (
    <SignUpComp>
      <Title>Sigin Up</Title>
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username@email.com"
          required
        />
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
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
          Sigin Up
        </SubmitButton>
      </form>
      <ToggleText onClick={() => openLoginModal()}>
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

const ToggleText = styled.p`
  /* Add your styles here */
`;

export default SignIn;