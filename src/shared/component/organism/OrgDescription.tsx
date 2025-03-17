import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../hooks/useEditMode';
import HeadlessTextArea from '../headless/textarea/HeadlessTextArea';
import { TextAlignment } from '../../enum/EnumRepository';
import { StyledDivComponent, StyledTextAreaComponent } from '../../dto/StyleCompRepository';
import MoleculeDescription from '../molecule/MoleculeDescription';

//isEditMode에 따라 HeadlessTextAread와 바뀌어야 하고
//visible에 따라 보이든 안보이든 해야함
//alignment에 따라 정렬해야함


interface OrgDescriptionProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  StyledTextarea: StyledTextAreaComponent;
  StyledDescription: StyledDivComponent;
  alignment?: TextAlignment;
  visible: boolean;
  changeVisible: () => void;
}

const OrgDescription: React.FC<OrgDescriptionProps> = ({
  value,
  handleChange,
  StyledTextarea,
  StyledDescription,
  alignment,
  visible,
  changeVisible,
}) => {
  const { isEditMode } = useEditMode();

  return (
    <>
      {isEditMode ? (
        <OrgDescriptionWrapper $isVisible={visible}>
          <HeadlessTextArea
            alignment={alignment ? alignment : TextAlignment.LEFT}
            content={value}
            placeholder="Enter description"
            handleChange={handleChange}
            StyledTextArea={StyledTextarea}
          />
          <VisibileGrab
            onDoubleClick={changeVisible}
          >:.</VisibileGrab>
        </OrgDescriptionWrapper>
      ) : (
        visible ?
          <MoleculeDescription
            value={value}
            StyledDescription={StyledDescription}
            alignment={alignment ? alignment : TextAlignment.LEFT}
          />
          :
          null
      )}
    </>
  );
};

const OrgDescriptionWrapper = styled.div<{ $isVisible: boolean }>`
  position: relative;
  display: flex;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.5)};
`;

const VisibileGrab = styled.div`
  top: 0;
  left: 10px;
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`;

export default OrgDescription;
