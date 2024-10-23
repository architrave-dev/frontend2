import React from 'react';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { MemberInfoInput, MemberInfoValue } from '../../shared/component/headless/input/InputBody';
import { CreateCareerReq } from '../../shared/dto/ReqDtoRepository';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import { CareerInfoComp, Content, InputWrapper, Year, YearSection } from './CareerInfo';

interface CareerInfoProps {
  tempId: string;
  initialContent: string;
  initialYearFrom: number;
}

const CareerInfo: React.FC<CareerInfoProps> = ({
  tempId,
  initialContent,
  initialYearFrom
}) => {
  const { isEditMode } = useEditMode();
  const { createdCareers, setCreatedCareers } = useCareerListStoreForUpdate();

  const handleChange = (field: keyof CreateCareerReq, value: string | number) => {
    const newCreatedCareers: CreateCareerReq[] = createdCareers.map(each =>
      each.tempId === tempId ? { ...each, [field]: value } : each
    )
    setCreatedCareers(newCreatedCareers);
  }
  const handleDelete = () => {
    const filteredList = createdCareers.filter((each) => each.tempId !== tempId);
    setCreatedCareers(filteredList);
  }

  return (
    <CareerInfoComp>
      {isEditMode ? (
        <>
          <YearSection>
            <InputWrapper>
              <HeadlessInput
                value={initialYearFrom}
                placeholder={"Enter YearFrom"}
                handleChange={(e) => handleChange("yearFrom", e.target.value)}
                StyledInput={MemberInfoInput}
              />
            </InputWrapper>
          </YearSection>
          <HeadlessInput
            value={initialContent}
            placeholder={"Enter value"}
            handleChange={(e) => handleChange("content", e.target.value)}
            StyledInput={MemberInfoValue}
          />
          <HeadlessBtn
            value={"Delete"}
            handleClick={handleDelete}
            StyledBtn={BtnDelete}
          />
        </>
      ) : (
        <>
          <YearSection>
            <Year>{initialYearFrom}</Year>
          </YearSection>
          <Content>{initialContent}</Content>
        </>
      )}
    </CareerInfoComp>
  );
};


export default CareerInfo;
