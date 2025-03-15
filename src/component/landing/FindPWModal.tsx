import React, { useState } from 'react';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { SettingInput } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnModalMain, BtnModalSub } from '../../shared/component/headless/button/BtnBody';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useValidation } from '../../shared/hooks/useValidation';
import Space from '../../shared/Space';
import { BtnContainer, ChangeModalComp, ErrorText, FindModalFrame, Title } from './FindAuiModal';


const FindPWModal: React.FC = () => {
  const { standardModal, isClosing, clearModal } = useModalStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { isEmail } = useValidation();

  if (standardModal == null) return null;

  const handleChange = () => {
    if (!validateEmail()) return;
    console.log(email);
  };

  const validateEmail = () => {
    if (!isEmail(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <FindModalFrame
      onClick={(e) => e.stopPropagation()}
      $isClosing={isClosing}
    >
      <ChangeModalComp>
        <Title>Find {standardModal.title}</Title>
        <HeadlessInput
          type={'text'}
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          placeholder={"Enter Email"}
          StyledInput={SettingInput}
        />
        <Space $height="20px">
          {error && <ErrorText>{error}</ErrorText>}
        </Space>
        <BtnContainer>
          <HeadlessBtn
            value={"Find"}
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
    </FindModalFrame>
  );
};


export default FindPWModal;