import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import HeadlessTextArea from '../headless/textarea/HeadlessTextArea';
import { TextAlignment } from '../../enum/EnumRepository';
import { StyledDivComponent, StyledTextAreaComponent } from '../../dto/StyleCompRepository';

interface MoleculeTextareaDescriptionProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  StyledTextarea: StyledTextAreaComponent;
  StyledDescription: StyledDivComponent;
  alignment?: TextAlignment;
}

const MoleculeTextareaDescription: React.FC<MoleculeTextareaDescriptionProps> = ({
  value,
  handleChange,
  StyledTextarea,
  StyledDescription,
  alignment,
}) => {
  const { isEditMode } = useEditMode();

  return (
    <>
      {isEditMode ? (
        <HeadlessTextArea
          alignment={alignment ? alignment : TextAlignment.LEFT}
          content={value}
          placeholder="Enter description"
          handleChange={handleChange}
          StyledTextArea={StyledTextarea}
        />
      ) : (
        <StyledDescription $alignment={alignment ? alignment : TextAlignment.LEFT} >
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
