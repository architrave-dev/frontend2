import React from 'react';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import { TextBoxWrapper } from './TextBox';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox } from '../../shared/component/headless/textarea/TextAreaBody';
import { SelectType, TextBoxAlignment } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq, CreateTextBoxReq } from '../../shared/dto/ReqDtoRepository';


export interface TextBoxProps {
  tempId: string;
  alignment: TextBoxAlignment | null;
  data: CreateTextBoxReq;
}

const TextBoxTemp: React.FC<TextBoxProps> = ({ tempId, alignment: initialTexBoxAlignment, data: initialData }) => {
  const { createdProjectElements, setCreatedProjectElements } = useProjectElementListStoreForUpdate();

  const handleAlignmentChange = (value: TextBoxAlignment) => {
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
      <SelectBox
        value={initialTexBoxAlignment || TextBoxAlignment.CENTER}
        selectType={SelectType.TEXTBOX_ALIGNMENT}
        handleChange={handleAlignmentChange} />
      <HeadlessTextArea
        alignment={initialTexBoxAlignment || TextBoxAlignment.CENTER}
        content={initialData.content}
        placeholder={"text"}
        handleChange={(e) => handlechange("content", e.target.value)}
        StyledTextArea={TextAreaTextBox}
      />
    </TextBoxWrapper>
  );
}

export default TextBoxTemp;