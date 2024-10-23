import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { MemberInfoInput, MemberInfoValue } from '../../shared/component/headless/input/InputBody';
import { RemoveCareerReq, UpdateCareerReq } from '../../shared/dto/ReqDtoRepository';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { useCareerListStore, useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import { CareerData } from '../../shared/dto/EntityRepository';

interface CareerInfoProps {
  careerId: string;
  initialContent: string;
  initialYearFrom: number;
}

const CareerInfo: React.FC<CareerInfoProps> = ({
  careerId,
  initialContent,
  initialYearFrom
  // onSave 
}) => {
  const { isEditMode } = useEditMode();
  const { careers, setCareers } = useCareerListStore();
  const { updatedCareers, setUpdatedCareers, removedCareers, setRemovedCareers } = useCareerListStoreForUpdate();

  const handleChange = (field: keyof UpdateCareerReq, value: string | number) => {
    const targetCareer = updatedCareers.find((c) => c.careerId === careerId);
    if (targetCareer) {
      //updatedCareers에 있다면
      const updatedCareerList = updatedCareers.map((each) =>
        each.careerId === careerId ? { ...each, [field]: value } : each
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
        yearTo: target.yearTo,
        content: target.content,
      }
      //updatedProjectElements에 추가한다.
      const newUpdateCareerReq: UpdateCareerReq = {
        ...tempUpdateCareerReq,
        [field]: value
      };
      setUpdatedCareers([...updatedCareers, newUpdateCareerReq]);
    }
    const updatedCareerList: CareerData[] = careers.map(each =>
      each.id === careerId ? { ...each, [field]: value } : each
    )
    setCareers(updatedCareerList);
  }

  const handleDelete = () => {
    const targetCareer = updatedCareers.find(each => each.careerId === careerId);
    if (targetCareer) {
      const updatedCareerList = updatedCareers.filter((each) => each.careerId !== careerId);
      setUpdatedCareers(updatedCareerList);
    }

    const filteredCareerList = careers.filter((each) => each.id !== careerId)
    setCareers(filteredCareerList);

    const newRemovedCareer: RemoveCareerReq = { careerId };
    setRemovedCareers([...removedCareers, newRemovedCareer]);
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

export const CareerInfoComp = styled.div`
  display: flex;
  height: 32px;
  gap: 20px;
  margin-bottom: 8px;
`;

export const YearSection = styled.div`
  display: flex;

  width: 4vw;  //날짜가 1개일 경우
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_02_2};
`;


export const Year = styled.div`
  width: 100%;
  padding: 5px 0px;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  padding: 5px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_1};
`;


export default CareerInfo;
