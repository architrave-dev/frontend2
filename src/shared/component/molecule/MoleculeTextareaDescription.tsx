import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import HeadlessTextArea, { StyledTextAreaComponent } from '../headless/textarea/HeadlessTextArea';
import { TextBoxAlignment } from '../../enum/EnumRepository';
import { StyledDivComponent } from '../../dto/StyleCompRepository';

interface MoleculeTextareaDescriptionProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  alignment?: TextBoxAlignment;
  textareaStyle: StyledTextAreaComponent;
  StyledDescription: StyledDivComponent;
}

const MoleculeTextareaDescription: React.FC<MoleculeTextareaDescriptionProps> = ({
  value,
  handleChange,
  alignment,
  textareaStyle,
  StyledDescription
}) => {
  const { isEditMode } = useEditMode();

  return (
    <>
      {isEditMode ? (
        <HeadlessTextArea
          alignment={alignment ? alignment : TextBoxAlignment.LEFT}
          content={value}
          placeholder="Enter description"
          handleChange={handleChange}
          StyledTextArea={textareaStyle}
        />
      ) : (
        <StyledDescription>
          {value.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </StyledDescription>
      )}
    </>
  );
};


export default MoleculeTextareaDescription;
