import React from 'react';
import { useEditMode } from '../../../shared/hooks/useEditMode';
import { useCareerListStore } from '../../../shared/store/careerStore';
import { StyledDivComponent, StyledInputComponent } from '../../../shared/dto/StyleCompRepository';
import HeadlessInput from '../../../shared/component/headless/input/HeadlessInput';
import { CareerData } from '../../../shared/dto/EntityRepository';
import { useValidation } from '../../../shared/hooks/useValidation';


interface MoleculeValueProps {
  careerId: string;
  value: string | number;
  targetField: keyof CareerData;
  inputStyle: StyledInputComponent;
  StyledDiv: StyledDivComponent;
}

const MoleculeValue: React.FC<MoleculeValueProps> = ({
  careerId,
  value,
  targetField,
  inputStyle,
  StyledDiv
}) => {
  const { isEditMode } = useEditMode();
  const { updateCareer } = useCareerListStore();
  const { checkType } = useValidation();

  const handleChange = (value: string) => {
    if (targetField === 'content') {
      updateCareer(careerId, { content: value })
    } else if (targetField === 'yearFrom') {
      if (checkType('yearFrom', value))
        updateCareer(careerId, { yearFrom: value })
    }
  };

  return (
    <>
      {isEditMode ? (
        <HeadlessInput
          value={value}
          placeholder={"Enter value"}
          handleChange={(e) => handleChange(e.target.value)}
          StyledInput={inputStyle}
        />
      ) : (
        <StyledDiv>{value}</StyledDiv>
      )}
    </>
  );
};


export default MoleculeValue;

