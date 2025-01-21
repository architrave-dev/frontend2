import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { TextBoxData } from '../../shared/dto/EntityRepository';
import { SelectType, TextAlignment } from '../../shared/enum/EnumRepository';
import { SelectBoxWrapper } from './Work';


export interface TextBoxProps {
  peId: string;
  alignment: TextAlignment;
  data: TextBoxData;
}

const TextBox: React.FC<TextBoxProps> = ({ peId, alignment, data }) => {
  const { isEditMode } = useEditMode();
  const { updateTextBox: handleChange, updateTextAlignment
  } = useProjectElementListStore();

  const handleAlignmentChange = (value: TextAlignment) => {
    updateTextAlignment(peId, value);
  };

  return (
    <TextBoxWrapper>
      {isEditMode ? (
        <>
          <SelectBoxContainer>
            <SelectBoxWrapper>
              <SelectBox
                value={alignment || TextAlignment.CENTER}
                selectType={SelectType.TEXT_ALIGNMENT}
                handleChange={handleAlignmentChange}
                direction={false} />
            </SelectBoxWrapper>
          </SelectBoxContainer>
          <HeadlessTextArea
            alignment={alignment || TextAlignment.CENTER}
            content={data.content}
            placeholder={"text"}
            handleChange={(e) => handleChange(peId, { content: e.target.value })}
            StyledTextArea={TextAreaTextBox}
          />
        </>
      ) : (
        <TextBoxContent $textBoxAlignment={alignment || TextAlignment.CENTER}>
          {data.content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}<br />
            </React.Fragment>
          ))}
        </TextBoxContent>
      )}
    </TextBoxWrapper>
  );
}

export const TextBoxWrapper = styled.div`
  position: relative;
  min-height: 80px;
`;

export const SelectBoxContainer = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  display: flex;
  gap: 20px;
`

const TextBoxContent = styled.div<{ $textBoxAlignment: TextAlignment }>`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $textBoxAlignment }) => getAlignment($textBoxAlignment)};
  ${({ theme }) => theme.typography.Body_02_2};
`;

export default TextBox;