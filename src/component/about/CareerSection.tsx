import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import { CareerType, DividerType } from '../../shared/enum/EnumRepository';
import Divider from '../../shared/Divider';
import CareerInfoTempList from './CareerInfoTempList';
import CareerInfoList from './CareerInfoList';

interface CareerSectionProps {
  title: string;
  type: CareerType;
}

const CareerSection: React.FC<CareerSectionProps> = ({ title, type }) => {
  const { careerList } = useCareer();
  const { createdCareers } = useCareerListStoreForUpdate();

  const filteredCareers = careerList.filter((each) => each.careerType === type);
  const filteredCreatedCareers = createdCareers.filter((each) => each.careerType === type);
  // useEffect(() => {},[careerList])

  if (filteredCareers.length + filteredCreatedCareers.length <= 0) {
    return null;
  }

  return (
    <Section>
      <CareerTitle>{title}</CareerTitle>
      <Divider dividerType={DividerType.PLAIN} bottom={'20px'} />
      <CareerInfoList
        careerList={filteredCareers}
      />
      <CareerInfoTempList
        createdlist={filteredCreatedCareers}
      />
    </Section>

  );
}

const Section = styled.div`
  position: relative;
  width: 60%;
  margin-bottom: 2rem;
`;

const CareerTitle = styled.h3`
  margin-bottom: 20px;
  ${({ theme }) => theme.typography.H_02};
`;

export default CareerSection;