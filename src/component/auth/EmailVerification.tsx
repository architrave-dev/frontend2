import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useLoadingStore } from '../../shared/store/loadingStore';

const EmailVerification: React.FC = () => {
  const { activate } = useAuth();
  const { isLoading } = useLoadingStore();
  const { clearModal } = useModalStore();

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
    // Initialize inputRefs array
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (isLoading) return;

    switch (event.key) {
      case 'Backspace':
        if (!verificationCode[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case 'ArrowLeft':
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case 'ArrowRight':
        if (index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
        break;
      case 'Escape':
        clearModal();
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
  };

  const digitsFilled = verificationCode.filter(d => d !== '').length;

  return (
    <Container ref={modalRef} tabIndex={-1}>
      <Title>Email Verification</Title>

      <InstructionText>Enter 6-digit code sent to your email address.</InstructionText>

      <VerificationContainer>
        {verificationCode.map((digit, index) => (
          <DigitInput
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </VerificationContainer>

      <ButtonContainer>
        <SubmitButton onClick={handleSubmit} disabled={isLoading || digitsFilled < 6}>
          Verify
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  outline: none;
  max-width: 360px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 44px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const InstructionText = styled.p`
  margin-bottom: 24px;
  ${({ theme }) => theme.typography.Body_03_1};
`;

const VerificationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const DigitInput = styled.input`
  width: 40px;
  height: 50px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  border-radius: 1px;
  ${({ theme }) => theme.typography.Body_02_1};

  &:focus {
    outline: none;
    border: 1.5px solid ${({ theme }) => theme.colors.color_Gray_03};
    border-radius: 2px;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.color_Gray_05};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0px;
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

export default EmailVerification;
