import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { MemberInfoValue } from '../../shared/component/headless/input/InputBody';
import { RemoveCareerReq } from '../../shared/dto/ReqDtoRepository';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { useCareerListStore, useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import MoleculeValue from './molecules/MoleculeValue';

interface CareerInfoProps {
  careerId: string;
  initialContent: string;
  initialYearFrom: number;
}

const CareerInfo: React.FC<CareerInfoProps> = ({
  careerId,
  initialContent,
  initialYearFrom
}) => {
  const { isEditMode } = useEditMode();
  const { careers, setCareers } = useCareerListStore();
  const { updatedCareers, setUpdatedCareers, removedCareers, setRemovedCareers } = useCareerListStoreForUpdate();


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
      <YearSection>
        <MoleculeValue
          careerId={careerId}
          value={initialYearFrom}
          targetField={"yearFrom"}
          inputStyle={MemberInfoValue}
          StyledDiv={Year}
        />
      </YearSection>
      <MoleculeValue
        careerId={careerId}
        value={initialContent}
        targetField={"content"}
        inputStyle={MemberInfoValue}
        StyledDiv={Content}
      />
      {isEditMode &&
        <HeadlessBtn
          value={"Delete"}
          handleClick={handleDelete}
          StyledBtn={BtnDelete}
        />
      }
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

export const Content = styled.div`
  width: 100%;
  padding: 5px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_1};
`;


export default CareerInfo;
