import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import { CareerType } from '../../shared/enum/EnumRepository';
import { CreateCareerReq, UpdatedCareerListReq } from '../../shared/dto/ReqDtoRepository';
import { BtnConfirm, BtnCreate } from '../../shared/component/headless/button/BtnBody';
import Loading from '../../shared/component/Loading';
import Space from '../../shared/Space';
import CareerSection from './CareerSection';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';

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
    console.log("handleCreateElement", careerType)
    const newElement: CreateCareerReq = {
      tempId: Math.floor(Math.random() * 1000) + "",
      careerType,
      yearFrom: new Date().getFullYear(),
      content: ""
    };
    console.log("newElement", newElement)

    setCreatedCareers([...createdCareers, newElement]);
  };

  const handleConfirm = async () => {
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

  // 로딩 상태를 처리합니다.
  if (isLoading || !careerList) return <Loading />;

  return (
    <CareerListComp>
      {careerSections.map((section) => (
        <CareerSection key={section.title} type={section.type} title={section.title} />
      ))}
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

const CreateButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default CareerList;