import React, { useState } from 'react';
import styled from 'styled-components';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useLoadingStore } from '../../shared/store/loadingStore';
import { useEmail } from '../../shared/hooks/useApi/useEmail';
import { EmailRequest } from '../../shared/dto/ReqDtoRepository';
import { useContact } from '../../shared/hooks/useApi/useContact';
import { AlertType, AlertPosition } from '../../shared/enum/EnumRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import MoleculeInput from '../auth/molecules/MoleculeInput';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputAuth } from '../../shared/component/headless/input/InputBody';

const EmailSend: React.FC = () => {
  const { setStandardAlert } = useStandardAlertStore();
  const { user } = useAuth();
  const { isLoading } = useLoadingStore();
  const { clearModal } = useModalStore();
  const { sendEmail } = useEmail();
  const { contact } = useContact();

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!user || !contact || contact.email === '') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 안되어있으면 메일 보낼 수 없음
    if (!user) return;

    if (subject === '' || body === '') {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Please check all required fields.",
      });
      return;
    }

    const emailRequest: EmailRequest = {
      from: user.email,
      to: contact.email,
      subject,
      body
    };

    await sendEmail(user.aui, emailRequest);
    clearModal();
  };

  return (
    <EmailSendComp>
      <Title>Send Email</Title>
      <form onSubmit={handleSubmit}>
        <EmailInfoWrapper>
          <EmailText>{user.email}</EmailText>
          <ArrowIcon>{"=>"}</ArrowIcon>
          <EmailText>{contact.email}</EmailText>
        </EmailInfoWrapper>

        <InputWrapper>
          <HeadlessInput
            type={'text'}
            value={subject}
            handleChange={(e) => setSubject(e.target.value)}
            placeholder={"Subject"}
            StyledInput={InputAuth}
          />
        </InputWrapper>
        <StyledTextarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Fill your message"
        />
        <ButtonContainer>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </SubmitButton>
        </ButtonContainer>
      </form>
    </EmailSendComp>
  );
};

const EmailSendComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 17px 14px;
  outline: none;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 10px 0px;
`;

const InputWrapper = styled.div`
  margin-bottom: 14px;
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

const Title = styled.h2`
  margin-bottom: 34px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  border-radius: 1px;
  resize: vertical;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  background-color: ${({ theme }) => theme.colors.color_White};
  ${({ theme }) => theme.typography.Body_02};

  &::placeholder {
    color: ${({ theme }) => theme.colors.color_Gray_04};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.color_Gray_02};
  }
`;

const EmailInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.color_Gray_06};
  border-radius: 1px;
`;

const EmailText = styled.span`
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_02};
`;

const ArrowIcon = styled.span`
  color: ${({ theme }) => theme.colors.color_Gray_03};
`;

export default EmailSend;