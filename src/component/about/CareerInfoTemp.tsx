import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { MemberInfoInput, MemberInfoValue } from '../../shared/component/headless/input/InputBody';
import { CreateCareerReq } from '../../shared/dto/ReqDtoRepository';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';

interface CareerInfoProps {
  tempId: string;
  initialContent: string;
  initialYearFrom: number;
  initialYearTo: number;
}

const CareerInfo: React.FC<CareerInfoProps> = ({
  tempId,
  initialContent,
  initialYearFrom,
  initialYearTo
  // onSave 
}) => {
  const { isEditMode } = useEditMode();
  const { createdCareers, setCreatedCareers } = useCareerListStoreForUpdate();

  const handleChange = (field: keyof CreateCareerReq, value: string) => {
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
                value={initialYearFrom.toString()}
                placeholder={"Enter YearFrom"}
                handleChange={(e) => handleChange("yearFrom", e.target.value)}
                StyledInput={MemberInfoInput}
              />
            </InputWrapper>
            <YearDivider> - </YearDivider>
            <InputWrapper>
              <HeadlessInput
                value={initialYearTo.toString()}
                placeholder={"Enter YearTo"}
                handleChange={(e) => handleChange("yearTo", e.target.value)}
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
            <YearDivider> - </YearDivider>
            <Year>{initialYearTo}</Year>
          </YearSection>
          <Content>{initialContent}</Content>
        </>
      )}
    </CareerInfoComp>
  );
};

const CareerInfoComp = styled.div`
  display: flex;
  height: 32px;
  gap: 20px;
  margin-bottom: 8px;
`;

const YearSection = styled.div`
  display: flex;

  
  width: 13vw;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_02_2};
`;

const YearDivider = styled.div`
width: 20%;
padding: 5px 0px;
`;

const Year = styled.div`
width: 40%;
  padding: 5px 0px;
`;

const InputWrapper = styled.div`
width: 40%;
`;

const Content = styled.div`
  width: 100%;
  padding: 5px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_1};
`;


export default CareerInfo;
