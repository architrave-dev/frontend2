import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectInfo from './ProjectInfo';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import ProjectInfoTemp from './ProjectInfoTemp';
import Space from '../../shared/Space';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import { CreateProjectInfoReq } from '../../shared/dto/ReqDtoRepository';

const ProjectInfoList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { projectInfoList } = useProjectInfoListStore();
  const { createPiList, setCreatePiList } = useProjectInfoListStoreForUpdate();

  const handleCreateInfo = () => {
    const newInfo: CreateProjectInfoReq = {
      tempId: Math.floor(Math.random() * 100) + "",
      customName: '',
      customValue: ''
    };
    setCreatePiList([...createPiList, newInfo]);
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
          {createPiList.map((each) => (
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
  position: relative;
`;

export default ProjectInfoList;