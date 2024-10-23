import React from 'react';
import { CreateCareerReq } from '../../shared/dto/ReqDtoRepository';
import CareerInfoTemp from './CareerInfoTemp';

interface CareerInfoTempListProps {
  createdlist: CreateCareerReq[];
}

const CareerInfoTempList: React.FC<CareerInfoTempListProps> = ({ createdlist }) => {
  return (
    <>
      {createdlist.map((each) => (
        <CareerInfoTemp
          key={each.tempId}
          tempId={each.tempId}
          initialContent={each.content}
          initialYearFrom={each.yearFrom}
        />
      ))}
    </>
  );
};


export default CareerInfoTempList;
