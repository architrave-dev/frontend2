import React from 'react';
import styled from 'styled-components';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { CareerType, DividerType, ModalType } from '../../shared/enum/EnumRepository';
import Divider from '../../shared/Divider';
import CareerInfo from './CareerInfo';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useModalStore } from '../../shared/store/portal/modalStore';

interface CareerSectionProps {
  title: string;
  type: CareerType;
}

const CareerSection: React.FC<CareerSectionProps> = ({ title, type }) => {
  const { isEditMode } = useEditMode();
  const { careerList } = useCareer();
  const { setStandardModal } = useModalStore();
  const filteredCareers = careerList.filter((each) => each.careerType === type);

  if (filteredCareers.length <= 0) {
    return null;
  }

  const handleReOrder = () => {
    setStandardModal({
      modalType: ModalType.INDEXING,
      title: "Career",
      value: type,
      handleChange: () => { },
    });
  }

  return (
    <Section>
      <TitleContainer>
        <CareerTitle>{title}</CareerTitle>
        {isEditMode && (
          <BtnContainer>
            <HeadlessBtn
              value={"Reorder"}
              handleClick={handleReOrder}
              StyledBtn={BtnCreate}
            />
          </BtnContainer>
        )}
      </TitleContainer>
      <Divider dividerType={DividerType.PLAIN} bottom={'16px'} />
      {filteredCareers.map((each) => (
        <CareerInfo
          key={each.id}
          data={each}
        />
      ))}
    </Section>
  );
}

const Section = styled.div`
  position: relative;
  width: 60%;
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CareerTitle = styled.h3`
  margin-bottom: 12px;
  ${({ theme }) => theme.typography.Body_01_1};
`;

const BtnContainer = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`

export default CareerSection;