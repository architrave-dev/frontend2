import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaMemberInfo } from '../../shared/component/headless/textarea/TextAreaBody';
import { TextBoxAlignment } from '../../shared/enum/EnumRepository';


interface MoleculeDescriptionProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  alignment?: TextBoxAlignment;
}

const MoleculeDescription: React.FC<MoleculeDescriptionProps> = ({
  value,
  handleChange,
  alignment
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
          StyledTextArea={TextAreaMemberInfo}
        />
      ) : (
        <Description>
          {value.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Description>
      )}
    </>
  );
};


const Description = styled.div`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: left;
  margin-bottom: 5px;
  ${({ theme }) => theme.typography.Body_02_2};
`;



export default MoleculeDescription;
