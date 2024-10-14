import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useWorkList } from '../../shared/hooks/useWorkList';
import WorkInfo from './WorkInfo';
import ColumnInfo from './ColumnInfo';
import { SortOrder } from '../../shared/component/SelectBox';
import SortStation, { sortWorkList } from './SortStation';
import { WorkData } from '../../shared/store/WorkListStore';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import Loading from '../../shared/component/Loading';

const WorkList: React.FC = () => {
  const { isLoading, workList, getWorkList } = useWorkList();
  const { aui } = useAui();
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.TITLE_ASC);
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


  return (
    <WorkListComp>
      <SortStation setSortOrder={setSortOrder} />
      <ColumnInfo />
      {sortedWorkList.map((each: WorkData) =>
        <WorkInfo key={each.id} data={each} />
      )}
    </WorkListComp>
  );
}

const WorkListComp = styled.section`
  width: 65vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 6vw;

  padding-top: 100px;
`;

export default WorkList;