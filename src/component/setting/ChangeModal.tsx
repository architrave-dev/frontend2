import React, { useState } from 'react';
import styled from 'styled-components';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { SettingInput } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnModalMain, BtnModalSub } from '../../shared/component/headless/button/BtnBody';
import { useModalStore } from '../../shared/store/portal/modalStore';


const ChangeModal: React.FC = () => {
  const { standardModal, clearModal } = useModalStore();
  const [temp, setTemp] = useState(standardModal?.value || "");

  if (standardModal == null) return null;

  const handleChange = () => {
    if (standardModal.handleChange) {
      standardModal.handleChange(temp);
    }
    clearModal();
  };

  return (
    <ChangeModalComp>
      <Title>Change {standardModal.title}</Title>
      <HeadlessInput
        type={'text'}
        value={temp}
        handleChange={(e) => setTemp(e.target.value)}
        placeholder={"Enter " + standardModal.title}
        StyledInput={SettingInput}
      />
      <BtnContainer>
        <HeadlessBtn
          value={"Change"}
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
  );
};

const ChangeModalComp = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2vh 1vw;
`

const Title = styled.h2`
  margin-bottom: 34px;
  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_01_1};
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1vw;

  margin-top: 2.5vh;
`

export default ChangeModal;