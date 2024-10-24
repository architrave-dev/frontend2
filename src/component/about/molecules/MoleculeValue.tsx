import React from 'react';
import { useEditMode } from '../../../shared/hooks/useEditMode';
import HeadlessInput from '../../../shared/component/headless/input/HeadlessInput';
import { CreateCareerReq, UpdateCareerReq } from '../../../shared/dto/ReqDtoRepository';
import { useCareerListStore, useCareerListStoreForUpdate } from '../../../shared/store/careerStore';
import { CareerData } from '../../../shared/dto/EntityRepository';
import { StyledDivComponent, StyledInputComponent } from '../../../shared/dto/StyleCompRepository';


interface MoleculeValueProps {
  careerId?: string;
  tempId?: string;
  value: string | number;
  targetField: keyof UpdateCareerReq | keyof CreateCareerReq;
  inputStyle: StyledInputComponent;
  StyledDiv: StyledDivComponent;
}

const MoleculeValue: React.FC<MoleculeValueProps> = ({
  careerId,
  tempId,
  value,
  targetField,
  inputStyle,
  StyledDiv
}) => {
  const { isEditMode } = useEditMode();
  const { careers, setCareers } = useCareerListStore();
  const { createdCareers, setCreatedCareers, updatedCareers, setUpdatedCareers } = useCareerListStoreForUpdate();

  const handleChange = (value: string | number) => {
    if (tempId) {
      console.log("tempId");
      const newCreatedCareers: CreateCareerReq[] = createdCareers.map(each =>
        each.tempId === tempId ? { ...each, [targetField]: value } : each
      )
      setCreatedCareers(newCreatedCareers);
    } else {
      console.log("careerId");
      const targetCareer = updatedCareers.find((c) => c.careerId === careerId);
      if (targetCareer) {
        //updatedCareers에 있다면
        const updatedCareerList = updatedCareers.map((each) =>
          each.careerId === careerId ? { ...each, [targetField]: value } : each
        )
        setUpdatedCareers(updatedCareerList);
      } else {
        //updatedCareers에 없다면
        const target = careers.find(c => c.id === careerId);

        if (!target) return;
        //target으로 UpdateCareerReq 를 생성 후 
        const tempUpdateCareerReq: UpdateCareerReq = {
          careerId: target.id,
          yearFrom: target.yearFrom,
          content: target.content,
        }
        //updatedProjectElements에 추가한다.
        const newUpdateCareerReq: UpdateCareerReq = {
          ...tempUpdateCareerReq,
          [targetField]: value
        };
        setUpdatedCareers([...updatedCareers, newUpdateCareerReq]);
      }
      const updatedCareerList: CareerData[] = careers.map(each =>
        each.id === careerId ? { ...each, [targetField]: value } : each
      )
      setCareers(updatedCareerList);
    }
  }

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

