import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { UpdateCareerReq } from '../../shared/store/careerStore';

interface CareerInfoProps {
  careerId: string;
  initialContent: string;
  initialYearFrom: number;
  initialYearTo: number;
}

const CareerInfo: React.FC<CareerInfoProps> = ({
  careerId,
  initialContent,
  initialYearFrom,
  initialYearTo
  // onSave 
}) => {
  const { isEditMode } = useEditMode();

  const handleChange = (field: keyof UpdateCareerReq, value: string) => {
  }

  return (
    <CareerInfoComp $isEditMode={isEditMode}>
      {isEditMode ? (
        <>
          <YearSection>
            <HeadlessInput
              value={initialYearFrom.toString()}
              placeholder={"Enter YearFrom"}
              handleChange={(e) => handleChange("yearFrom", e.target.value)}
              StyledInput={Year}
            />
            <HeadlessInput
              value={initialYearTo.toString()}
              placeholder={"Enter YearTo"}
              handleChange={(e) => handleChange("yearTo", e.target.value)}
              StyledInput={Year}
            />
          </YearSection>
          <HeadlessInput
            value={initialContent}
            placeholder={"Enter value"}
            handleChange={(e) => handleChange("content", e.target.value)}
            StyledInput={Content}
          />
        </>
      ) : (
        <>
          <YearSection>
            <Year>{initialYearFrom}</Year>
            <span> - </span>
            <Year>{initialYearTo}</Year>
          </YearSection>
          <Content>{initialContent}</Content>
        </>
      )}
    </CareerInfoComp>
  );
};

const CareerInfoComp = styled.div<{ $isEditMode: boolean }>`
  display: flex;
  height: 40px;
  gap: 20px;
  margin-bottom: ${({ $isEditMode }) => $isEditMode ? '8px' : '10px'};
`;

const YearSection = styled.div`
  display: flex;
  width: 18vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const Year = styled.div`
  padding: 5px;
`;

const Content = styled.div`
  width: 60vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_1};
`;


export default CareerInfo;
