import React from 'react';
import CareerInfo from './CareerInfo';
import { CareerData } from '../../shared/dto/EntityRepository';

interface CareerInfoListProps {
  careerList: CareerData[];
}

const CareerInfoTempList: React.FC<CareerInfoListProps> = ({ careerList }) => {
  return (
    <>
      {careerList.map((each) => (
        <CareerInfo
          key={each.id}
          careerId={each.id}
          initialContent={each.content}
          initialYearFrom={each.yearFrom}
        />
      ))}
    </>
  );
};


export default CareerInfoTempList;
