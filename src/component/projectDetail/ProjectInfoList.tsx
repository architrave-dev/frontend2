import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';
import ProjectInfo from './ProjectInfo';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import ProjectInfoTemp from './ProjectInfoTemp';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';
import Space from '../../shared/Space';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';

const ProjectInfoList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { isLoading } = useProjectDetail();
  const { projectInfoList } = useProjectInfoListStore();
  const { createInfoList, setCreateInfoList } = useProjectInfoListStoreForUpdate();

  const handleCreateInfo = () => {
    const newInfo: CreateProjectInfoReq = {
      tempId: Math.floor(Math.random() * 100) + "",
      customName: '',
      customValue: ''
    };
    setCreateInfoList([...createInfoList, newInfo]);
  };


  return (
    <ProjectInfoListComp>
      {projectInfoList && projectInfoList.map((each, index) =>
        <ProjectInfo
          key={index}
          projectInfoId={each.id}
          initialCustomName={each.customName}
          initialCustomValue={each.customValue}
        />
      )}
      {isEditMode &&
        <>
          {createInfoList.map((each) => (
            <ProjectInfoTemp
              key={each.tempId}
              tempId={each.tempId}
              initialCustomName={each.customName}
              initialCustomValue={each.customValue}
            />
          ))}
        </>
      }
      <Space $align={"center"} $height={"calc(6vw)"}>
        {isEditMode &&
          <HeadlessBtn
            value={"Info"}
            handleClick={handleCreateInfo}
            StyledBtn={BtnCreate}
          />
        }
      </Space>
    </ProjectInfoListComp>
  );
}

const ProjectInfoListComp = styled.article`
`;

export default ProjectInfoList;