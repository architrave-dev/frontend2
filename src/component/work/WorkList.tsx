import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import WorkInfo from './WorkInfo';
import { sortWorkList } from './SortStation';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import Loading from '../../shared/component/Loading';
import { SortOrder } from '../../shared/enum/EnumRepository';
import { WorkData } from '../../shared/dto/EntityRepository';
import WorkViewer from './WorkViewer';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnCreateWide } from '../../shared/component/headless/button/BtnBody';
import { CreateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { useEditMode } from '../../shared/hooks/useEditMode';

const WorkList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading, workList, getWorkList, createWork } = useWorkList();
  const { aui } = useAui();
  const [sortOrder] = useState<SortOrder>(SortOrder.TITLE_ASC);
  const { setActiveWork } = useWorkViewStore();
  const { setUpdatedActiveWork } = useWorkViewStoreForUpdate();

  const setDefaultWorkView = () => {
    const defaultWork: WorkData = {
      id: '',
      originUrl: '',
      thumbnailUrl: '',
      title: 'Select Work',
      description: '-',
      size: { width: '000', height: '000' },
      material: '',
      prodYear: ''
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

  const sortedWorkList = Array.isArray(workList) ? sortWorkList(workList, sortOrder) : [];

  const handleCreateWork = async () => {
    const newWork: CreateWorkReq = {
      originUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      thumbnailUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      title: "New Work",
      description: "This is New Work",
      size: {
        width: "000",
        height: "000"
      },
      material: "material",
      prodYear: new Date().getFullYear().toString()
    }
    try {
      await createWork(aui, newWork);
    } catch (err) { };
  };

  return (
    <>
      <WorkListComp>
        {sortedWorkList.map((each: WorkData) =>
          <WorkInfo key={each.id} data={each} />
        )}
        {isEditMode &&
          <HeadlessBtn
            value={"Create"}
            handleClick={handleCreateWork}
            StyledBtn={BtnCreateWide}
          />
        }
      </WorkListComp>
      <WorkViewer />
    </>
  );
}

const WorkListComp = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default WorkList;