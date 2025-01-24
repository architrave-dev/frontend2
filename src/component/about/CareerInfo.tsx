import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { MemberInfoValue } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete, BtnModalMain, BtnModalSub, BtnWorkViewer } from '../../shared/component/headless/button/BtnBody';
import { useCareerListStore } from '../../shared/store/careerStore';
import MoleculeValue from './molecules/MoleculeValue';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { useAui } from '../../shared/hooks/useAui';
import { CareerData } from '../../shared/dto/EntityRepository';

interface CareerInfoProps {
  data: CareerData;
}

const CareerInfo: React.FC<CareerInfoProps> = ({ data }) => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { updateCareer, deleteCareer } = useCareer();
  const { afterDeleteCareer } = useCareerListStore();

  const handleUpdate = async () => {
    try {
      await updateCareer(aui, { careerId: data.id, ...data });
    } catch (err) {
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCareer(aui, { careerId: data.id });
      afterDeleteCareer(data.id);
    } catch (err) {
    }
  }

  return (
    <CareerInfoComp>
      <YearSection>
        <MoleculeValue
          careerId={data.id}
          value={data.yearFrom}
          targetField={"yearFrom"}
          inputStyle={MemberInfoValue}
          StyledDiv={Year}
        />
      </YearSection>
      <MoleculeValue
        careerId={data.id}
        value={data.content}
        targetField={"content"}
        inputStyle={MemberInfoValue}
        StyledDiv={Content}
      />
      {isEditMode &&
        <BtnContainer>
          {data.hasChanged &&
            <HeadlessBtn
              value={"Update"}
              handleClick={handleUpdate}
              StyledBtn={BtnModalMain}
            />
          }
          <HeadlessBtn
            value={"Delete"}
            handleClick={handleDelete}
            StyledBtn={BtnModalSub}
          />
        </BtnContainer>
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

const BtnContainer = styled.div`
  position: absolute;
  right: 0px;
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5vw;

  padding: 4px 0px;
`

export default CareerInfo;
