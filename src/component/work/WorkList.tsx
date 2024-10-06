import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useWorkList } from '../../shared/hooks/useWorkList';
import WorkInfo from './WorkInfo';
import ColumnInfo from './ColumnInfo';
import { SortOrder } from '../../shared/component/SelectBox';
import SortStation, { sortWorkList } from './SortStation';
import { WorkData } from '../../shared/store/WorkListStore';

const WorkList: React.FC = () => {
  const { isLoading, error, workList, getWorkList } = useWorkList();
  const { aui } = useAui();
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.TITLE_ASC);

  useEffect(() => {
    const getWorkListWithApi = async () => {
      if (aui) {
        try {
          console.log("getting work List...")
          await getWorkList(aui);
        } catch (error) {
          console.error('get WorkList failed:', error);
        }
      }
    }
    getWorkListWithApi();
  }, [aui]);

  // 로딩 및 에러 상태를 처리합니다.
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading works: {error}</div>;

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
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 6vw;

  padding-top: 100px;
`;

export default WorkList;