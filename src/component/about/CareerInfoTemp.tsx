import React from 'react';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { MemberInfoValue } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import { CareerInfoComp, Content, Year, YearSection } from './CareerInfo';
import MoleculeValue from './molecules/MoleculeValue';

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

  const handleDelete = () => {
    const filteredList = createdCareers.filter((each) => each.tempId !== tempId);
    setCreatedCareers(filteredList);
  }

  return (
    <CareerInfoComp>
      <YearSection>
        <MoleculeValue
          tempId={tempId}
          value={initialYearFrom}
          targetField={"yearFrom"}
          inputStyle={MemberInfoValue}
          StyledDiv={Year}
        />
      </YearSection>
      <MoleculeValue
        tempId={tempId}
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


export default CareerInfo;
