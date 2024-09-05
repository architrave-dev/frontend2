import React from 'react';
import { CreateProjectElementReq, CreateTextBoxReq, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import SelectBox, { SelectType, TextBoxAlignment } from '../../shared/component/SelectBox';
import ReuseTextArea, { TextArea } from '../../shared/component/ReuseTextArea';
import { TextBoxWrapper } from './TextBox';


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
      <ReuseTextArea
        type={TextArea.TEXTBOX}
        placeholder={"text"}
        alignment={initialTexBoxAlignment || TextBoxAlignment.CENTER}
        content={initialData.content}
        handleChange={(e) => handlechange("content", e.target.value)}
      />
    </TextBoxWrapper>
  );
}

export default TextBoxTemp;