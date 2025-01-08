import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import WorkInfo from './WorkInfo';
import { sortWorkList } from './SortStation';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import { WorkData } from '../../shared/dto/EntityRepository';
import WorkViewer from './WorkViewer';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnCreateWide } from '../../shared/component/headless/button/BtnBody';
import { CreateWorkReq } from '../../shared/dto/ReqDtoRepository';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkListStore } from '../../shared/store/WorkListStore';
import Space from '../../shared/Space';
import { AlertPosition, AlertType, WorkType } from '../../shared/enum/EnumRepository';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';

const WorkList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { workList, getWorkList, createWork } = useWorkList();
  const { sortBy } = useWorkListStore();
  const { aui } = useAui();
  const { setActiveWork } = useWorkViewStore();
  const { setUpdatedActiveWork, clearAll } = useWorkViewStoreForUpdate();

  const { getWork } = useWorkList();
  const { setStandardAlert } = useStandardAlertStore();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const workListRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (workListRef.current) {
      // 컨테이너에 포커스 설정
      workListRef.current.focus();
    }
  }, [workListRef]);


  const setDefaultWorkView = () => {
    const defaultWork: WorkData = {
      id: '',
      workType: WorkType.NONE,
      uploadFile: {
        id: '',
        originUrl: '',
        thumbnailUrl: ''
      },
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
        clearAll();
        console.log("getting work List...")
        await getWorkList(aui);
        setDefaultWorkView();
      } catch (error) { }
    }
    getWorkListWithApi();
  }, [aui]);


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


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!sortedWorkList.length) return;
    let newIndex = selectedIndex;
    if (e.key === 'ArrowDown') {
      if (selectedIndex < sortedWorkList.length - 1) {
        newIndex = selectedIndex + 1;
      }
    } else if (e.key === 'ArrowUp') {
      if (selectedIndex > 0) {
        newIndex = selectedIndex - 1;
      }
    }
    changeActiveWork(newIndex);
  };

  const handleClick = (i: number) => {
    if (!sortedWorkList.length) return;
    let newIndex = i;
    changeActiveWork(newIndex);
  };

  const changeActiveWork = (newIndex: number) => {
    if (newIndex !== selectedIndex) {
      if (isEditMode) {
        setStandardAlert({
          type: AlertType.ALERT,
          position: AlertPosition.TOP,
          content: "Exit edit mode."
        })
        return;
      }
      const getWorkWithDetailWithApi = async () => {
        try {
          console.log("getting work Detail List...")
          await getWork(sortedWorkList[newIndex].id);
          setSelectedIndex(newIndex);
        } catch (error) { }
      }

      getWorkWithDetailWithApi();
    }
  }

  return (
    <WorkListContainer
      tabIndex={0}
      ref={workListRef}
      onKeyDown={handleKeyDown}>
      <WorkListComp>
        {sortedWorkList.map((each: WorkData, i: number) =>
          <WorkInfo
            key={each.id}
            data={each}
            isSelected={i === selectedIndex}
            handleClick={() => handleClick(i)}
          />
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
  padding-bottom: calc(9vh);
  outline: none;
`;

const WorkListComp = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default WorkList;