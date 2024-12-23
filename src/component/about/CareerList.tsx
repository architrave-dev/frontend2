import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useCareerListStoreForUpdate } from '../../shared/store/careerStore';
import { CareerType } from '../../shared/enum/EnumRepository';
import { CreateCareerReq } from '../../shared/dto/ReqDtoRepository';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import Loading from '../../shared/component/Loading';
import Space from '../../shared/Space';
import CareerSection from './CareerSection';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';

const CareerList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, careerList, getCareerList } = useCareer();
  const { createdCareers, setCreatedCareers } = useCareerListStoreForUpdate();
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
      yearFrom: new Date().getFullYear(),
      content: ""
    };

    setCreatedCareers([...createdCareers, newElement]);
  };

  const careerSections = [
    { type: CareerType.EDU, title: 'Education' },
    { type: CareerType.S_EXH, title: 'Solo Exhibition' },
    { type: CareerType.G_EXH, title: 'Group Exhibition' },
    { type: CareerType.PRZ, title: 'Prize' },
    { type: CareerType.PRS, title: 'Press' },
    { type: CareerType.RSD, title: 'Residency' },
    { type: CareerType.RPS, title: 'Representation' },
    { type: CareerType.TCH, title: 'Teach' },
    { type: CareerType.PBL, title: 'Publication' },
    { type: CareerType.COL, title: 'Collections' },
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
            <HeadlessBtn
              value={"Prize"}
              handleClick={() => handleCreateElement(CareerType.PRZ)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Press"}
              handleClick={() => handleCreateElement(CareerType.PRS)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Residency"}
              handleClick={() => handleCreateElement(CareerType.RSD)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Representation"}
              handleClick={() => handleCreateElement(CareerType.RPS)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Teach"}
              handleClick={() => handleCreateElement(CareerType.TCH)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Publication"}
              handleClick={() => handleCreateElement(CareerType.PBL)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Collections"}
              handleClick={() => handleCreateElement(CareerType.COL)}
              StyledBtn={BtnCreate}
            />
          </CreateButtonGroup>
        </Space>
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