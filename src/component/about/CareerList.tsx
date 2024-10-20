import React, { useEffect } from 'react';
import styled from 'styled-components';
import CareerInfo from './CareerInfo';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import Loading from '../../shared/component/Loading';
import { CareerType } from '../../shared/enum/EnumRepository';
import { CreateCareerReq, UpdatedCareerListReq } from '../../shared/dto/ReqDtoRepository';

const CareerList: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { isLoading, careerList, getCareerList, updateCareerList } = useCareer();
  const { createdCareers, setCreatedCareers, updatedCareers, removedCareers } = useCareerListStoreForUpdate();
  const { aui } = useAui();

  useEffect(() => {
    const getCareerListWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting career List...")
        await getCareerList(aui);
      } catch (error) { }
    }
    getCareerListWithApi();
  }, [aui]);

  const handleCreateElement = (careerType: CareerType) => {
    const newElement: CreateCareerReq = {
      careerType,
      yearFrom: 2024,
      yearTo: 2024,
      content: "Hello"
    };

    setCreatedCareers([...createdCareers, newElement]);
  };

  const handleConfirm = async () => {
    if (!careerList) return;

    const updatedData: UpdatedCareerListReq = {
      createCareerReqList: createdCareers,
      updateCareerReqList: updatedCareers,
      removeCareerReqList: removedCareers
    }
    try {
      await updateCareerList(aui, updatedData);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  }

  const isChanged = (): boolean => {
    return (
      createdCareers.length > 0 ||
      updatedCareers.length > 0 ||
      removedCareers.length > 0
    );
  }

  const careerSections = [
    { type: CareerType.S_EXH, title: 'Solo Exhibition' },
    { type: CareerType.G_EXH, title: 'Group Exhibition' },
    { type: CareerType.RPS, title: 'Representation' },
    { type: CareerType.PRS, title: 'Press' },
    { type: CareerType.EDU, title: 'Education' },
  ];

  const renderCareerSections = () => {
    if (!careerList) return null;

    return careerSections.map((section) => {
      const filteredCareers = careerList.filter((each) => each.careerType === section.type);

      if (filteredCareers.length === 0) return null;

      return (
        <Section key={section.type}>
          <CareerTitle>{section.title}</CareerTitle>
          {filteredCareers.map((each) => (
            <CareerInfo
              key={each.id}
              careerId={each.id}
              initialContent={each.content}
              initialYearFrom={each.yearFrom}
              initialYearTo={each.yearTo}
            />
          ))}
        </Section>
      );
    });
  };

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <CareerListComp>
      {renderCareerSections()}
    </CareerListComp>
  );
}

const CareerListComp = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 40px 6vw;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const CareerTitle = styled.h2`

`;

export default CareerList;