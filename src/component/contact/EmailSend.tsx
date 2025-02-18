import React, { useState } from 'react';
import styled from 'styled-components';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useLoadingStore } from '../../shared/store/loadingStore';
import { useEmail } from '../../shared/hooks/useApi/useEmail';
import { EmailRequest } from '../../shared/dto/ReqDtoRepository';
import { useContact } from '../../shared/hooks/useApi/useContact';


const EmailSend: React.FC = () => {
  const { isLoading } = useLoadingStore();
  const { clearModal } = useModalStore();
  const { sendEmail } = useEmail();
  const { contact } = useContact();
  const [formData, setFormData] = useState({
    from: '',
    to: contact!.email,
    subject: '',
    body: ''
  });

  if (!contact || contact.email === '') {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRequest: EmailRequest = {
      from: formData.from,
      to: formData.to,
      subject: formData.subject,
      body: formData.body
    };

    await sendEmail('', emailRequest); // Note: aui parameter needs to be provided
    clearModal();
  };

  return (
    <EmailSendComp>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            name="from"
            placeholder="From"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <ReadOnlyField>
            <Label>To:</Label>
            <Value>{formData.to}</Value>
          </ReadOnlyField>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <TextArea
            name="body"
            placeholder="Body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </InputWrapper>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
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

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 120px;
  resize: vertical;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 14px;
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


const ReadOnlyField = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f5f5;
`;

const Label = styled.span`
  color: #666;
  margin-right: 8px;
`;

const Value = styled.span`
  color: #333;
`;

export default EmailSend;