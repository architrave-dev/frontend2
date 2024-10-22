import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProjectTitle from '../../component/projectDetail/ProjectTitle';
import Divider from '../../shared/Divider';
import ProjectInfoList from '../../component/projectDetail/ProjectInfoList';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useAui } from '../../shared/hooks/useAui';
import RepresentImg from './RepresentImg';
import { useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import Loading from '../../shared/component/Loading';
import { DividerType, TextBoxAlignment } from '../../shared/enum/EnumRepository';
import { UpdateProjectReq } from '../../shared/dto/ReqDtoRepository';
import { IndexData, ProjectData } from '../../shared/dto/EntityRepository';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { useProjectStoreForUpdate } from '../../shared/store/projectStore';

const ProjectDetailContainer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { isLoading, project, updateProject } = useProjectDetail();
  const { updatedProjectDto, setUpdatedProjectDto } = useProjectStoreForUpdate();
  const { createPiList, updatePiList, removePiList } = useProjectInfoListStoreForUpdate();

  const { aui } = useAui();


  if (!project || !updatedProjectDto) {
    return null;
  }
  const convertToPiIndexList = (): IndexData[] => {
    return [];
  }
  const handleConfirm = async () => {
    if (!project) return;
    if (!updatedProjectDto) return;

    const newUpdateProjectReq: UpdateProjectReq = {
      ...updatedProjectDto,
      piIndexList: convertToPiIndexList(),
      createdProjectInfoList: createPiList,
      updatedProjectInfoList: updatePiList,
      removedProjectInfoList: removePiList
    }
    try {
      await updateProject(aui, newUpdateProjectReq);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  const handleChange = (field: keyof ProjectData, value: string) => {
    setUpdatedProjectDto({ ...updatedProjectDto, [field]: value });
  }
  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    setUpdatedProjectDto({
      ...updatedProjectDto,
      originUrl,
      thumbnailUrl
    });
  }
  const isChanged = (): boolean => {
    return (
      project.originUrl !== updatedProjectDto.originUrl ||
      project.title !== updatedProjectDto.title ||
      project.description !== updatedProjectDto.description ||
      (createPiList.length ?? 0) > 0 ||
      (updatePiList.length ?? 0) > 0 ||
      (removePiList.length ?? 0) > 0
    );
  };

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <ProjectDetailContainerComp>
      {isEditMode && project && isChanged() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
      <RepresentImg backgroundImg={updatedProjectDto.originUrl} />
      <ProjectDetailWrapper>
        <ProjectTitle title={updatedProjectDto.title} handleChange={(e) => handleChange('title', e.target.value)} />
        <Divider dividerType={DividerType.PLAIN} />
        {isEditMode ?
          <HeadlessTextArea
            alignment={TextBoxAlignment.LEFT}
            content={updatedProjectDto.description}
            placeholder={"project description"}
            handleChange={(e) => handleChange('description', e.target.value)}
            StyledTextArea={TextAreaTextBox}
          />
          :
          <Description $textBoxAlignment={TextBoxAlignment.LEFT}>
            {updatedProjectDto.description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}<br />
              </React.Fragment>
            ))}
          </Description>
        }
        <ProjectInfoList />
      </ProjectDetailWrapper>
    </ProjectDetailContainerComp>
  );
}

const ProjectDetailContainerComp = styled.section`
  position: relative;
`;
const ProjectDetailWrapper = styled.article`
  padding: calc(8vh) calc(10vw);
`;

const Description = styled.div<{ $textBoxAlignment: TextBoxAlignment }>`
  padding: 8px 0px;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $textBoxAlignment }) => getAlignment($textBoxAlignment)};
  ${({ theme }) => theme.typography.Body_02_2};
`;


export default ProjectDetailContainer;