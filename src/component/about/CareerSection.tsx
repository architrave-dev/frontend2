import React from 'react';
import styled from 'styled-components';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { CareerType, DividerType } from '../../shared/enum/EnumRepository';
import Divider from '../../shared/Divider';
import CareerInfo from './CareerInfo';

interface CareerSectionProps {
  title: string;
  type: CareerType;
}

const CareerSection: React.FC<CareerSectionProps> = ({ title, type }) => {
  const { careerList } = useCareer();

  const filteredCareers = careerList.filter((each) => each.careerType === type);

  if (filteredCareers.length <= 0) {
    return null;
  }

  return (
    <Section>
      <CareerTitle>{title}</CareerTitle>
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

const CareerTitle = styled.h3`
  margin-bottom: 12px;
  ${({ theme }) => theme.typography.Body_01_1};
`;

export default CareerSection;