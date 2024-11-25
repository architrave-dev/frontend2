import React from 'react';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import { SelectBoxContainer, TextBoxWrapper } from './TextBox';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox } from '../../shared/component/headless/textarea/TextAreaBody';
import { SelectType, TextAlignment } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq, CreateTextBoxReq } from '../../shared/dto/ReqDtoRepository';


export interface TextBoxProps {
  tempId: string;
  alignment: TextAlignment | null;
  data: CreateTextBoxReq;
}

const TextBoxTemp: React.FC<TextBoxProps> = ({ tempId, alignment: initialTexBoxAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleAlignmentChange = (value: TextAlignment) => {
    const updatedProjectElementList = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, textBoxAlignment: value } : each
    );
    setCreatedProjectElements(updatedProjectElementList);
  };

  const handlechange = (field: keyof CreateTextBoxReq, value: string) => {
    const newCreatedProjectElements: CreateProjectElementReq[] = createdProjectElements.map(each =>
      each.tempId === tempId ? { ...each, createTextBoxReq: { ...each.createTextBoxReq, [field]: value } as CreateTextBoxReq } : each
    )
    setCreatedProjectElements(newCreatedProjectElements);
  }

  return (
    <TextBoxWrapper>
      <SelectBoxContainer>
        <SelectBox
          value={initialTexBoxAlignment || TextAlignment.CENTER}
          selectType={SelectType.TEXT_ALIGNMENT}
          handleChange={handleAlignmentChange} />
      </SelectBoxContainer>
      <HeadlessTextArea
        alignment={initialTexBoxAlignment || TextAlignment.CENTER}
        content={initialData.content}
        placeholder={"text"}
        handleChange={(e) => handlechange("content", e.target.value)}
        StyledTextArea={TextAreaTextBox}
      />
    </TextBoxWrapper>
  );
}

export default TextBoxTemp;