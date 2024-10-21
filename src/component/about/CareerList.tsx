import React, { useEffect } from 'react';
import styled from 'styled-components';
import CareerInfo from './CareerInfo';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import Loading from '../../shared/component/Loading';
import { CareerType, DividerType } from '../../shared/enum/EnumRepository';
import { CreateCareerReq, UpdatedCareerListReq } from '../../shared/dto/ReqDtoRepository';
import Divider from '../../shared/Divider';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm, BtnCreate } from '../../shared/component/headless/button/BtnBody';
import Space from '../../shared/Space';
import CareerInfoTemp from './CareerInfoTemp';

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
      tempId: Math.floor(Math.random() * 1000) + "",
      careerType,
      yearFrom: 2024,
      yearTo: 2024,
      content: ""
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
      const filteredCreatedCareers = createdCareers.filter((each) => each.careerType === section.type);

      if (filteredCareers.length === 0) return null;

      return (
        <Section key={section.type}>
          <CareerTitle>{section.title}</CareerTitle>
          <Divider dividerType={DividerType.PLAIN} bottom={'20px'} />
          {filteredCreatedCareers.map((each) => (
            <CareerInfoTemp
              key={each.tempId}
              tempId={each.tempId}
              initialContent={each.content}
              initialYearFrom={each.yearFrom}
              initialYearTo={each.yearTo}
            />
          ))}
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
      {isEditMode &&
        <Space $align={"center"} $height={"calc(6vw)"}>
          <CreateButtonGroup>
            <HeadlessBtn
              value={"Education"}
              handleClick={() => handleCreateElement(CareerType.EDU)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Exhibition Solo"}
              handleClick={() => handleCreateElement(CareerType.S_EXH)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Exhibition Group"}
              handleClick={() => handleCreateElement(CareerType.G_EXH)}
              StyledBtn={BtnCreate}
            />
          </CreateButtonGroup>
        </Space>
      }
      {isEditMode && isChanged() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
    </CareerListComp>
  );
}

const CareerListComp = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 40px 0px;
`;

const Section = styled.div`
  position: relative;
  width: 60%;
  margin-bottom: 2rem;
`;

const CareerTitle = styled.h3`
  margin-bottom: 20px;
  ${({ theme }) => theme.typography.H_02};
`;

const CreateButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default CareerList;