import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import WorkInfo from './WorkInfo';
import { sortWorkList } from './SortStation';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import Loading from '../../shared/component/Loading';
import { WorkData } from '../../shared/dto/EntityRepository';
import WorkViewer from './WorkViewer';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnCreateWide } from '../../shared/component/headless/button/BtnBody';
import { CreateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkListStore } from '../../shared/store/WorkListStore';
import Space from '../../shared/Space';
import { WorkType } from '../../shared/enum/EnumRepository';

const WorkList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, workList, getWorkList, createWork } = useWorkList();
  const { sortBy } = useWorkListStore();
  const { aui } = useAui();
  const { setActiveWork } = useWorkViewStore();
  const { setUpdatedActiveWork } = useWorkViewStoreForUpdate();

  const setDefaultWorkView = () => {
    const defaultWork: WorkData = {
      id: '',
      workType: WorkType.NONE,
      originUrl: '',
      thumbnailUrl: '',
      title: 'Select Work',
      description: 'Description section',
      size: { width: '000', height: '000' },
      material: 'material',
      prodYear: '0000',
      price: '',
      collection: ''
    };
    setActiveWork(defaultWork);
    setUpdatedActiveWork(defaultWork);
  }
  useEffect(() => {
    const getWorkListWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting work List...")
        await getWorkList(aui);
        setDefaultWorkView();
      } catch (error) { }
    }
    getWorkListWithApi();
  }, [aui]);

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  const sortedWorkList = Array.isArray(workList) ? sortWorkList(workList, sortBy) : [];

  const handleCreateWork = async () => {
    const newWork: CreateWorkReq = {
      workType: WorkType.NONE,
      originUrl: '',
      thumbnailUrl: '',
      title: "New Work",
      description: "This is New Work",
      size: {
        width: "000",
        height: "000"
      },
      material: "material",
      prodYear: new Date().getFullYear().toString(),
      price: "",
      collection: ""
    }
    try {
      await createWork(aui, newWork);
    } catch (err) { };
  };

  return (
    <WorkListContainer>
      <WorkListComp>
        {sortedWorkList.map((each: WorkData) =>
          <WorkInfo key={each.id} data={each} />
        )}
        {isEditMode &&
          <Space $height='80px'>
            <HeadlessBtn
              value={"Create"}
              handleClick={handleCreateWork}
              StyledBtn={BtnCreateWide}
            />
          </Space>
        }

      </WorkListComp>
      <WorkViewer />
    </WorkListContainer>
  );
}
const WorkListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-bottom: calc(8vh);
`;

const WorkListComp = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default WorkList;