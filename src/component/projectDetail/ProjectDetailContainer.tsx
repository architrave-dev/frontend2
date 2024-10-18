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
import { ProjectData } from '../../shared/dto/EntityRepository';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { useProjectStoreForUpdate } from '../../shared/store/projectStore';

const ProjectDetailContainer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { aui } = useAui();
  const { isLoading, project, updateProject } = useProjectDetail();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");

  const { updatedProject, setUpdatedProject } = useProjectStoreForUpdate();
  const { createInfoList, updateInfoList, removeInfoList } = useProjectInfoListStoreForUpdate();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setBackgroundImageUrl(project.originUrl);
      setThumbnailImageUrl(project.thumbnailUrl);
    }
  }, [project]);

  const handleConfirm = async () => {
    if (!project) return;

    const updatedData: UpdateProjectReq = {
      id: project.id,
      originUrl: backgroundImageUrl,
      thumbnailUrl: thumbnailImageUrl,
      title: title,
      description: description,
      piIndexList: [],  //이걸 어쩌나...
      createdProjectInfoList: createInfoList,
      updatedProjectInfoList: updateInfoList,
      removedProjectInfoList: removeInfoList,
    };

    try {
      await updateProject(aui, updatedData);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  const isChanged = (initialData: ProjectData): boolean => {
    const currentData = {
      id: initialData.id,
      originUrl: backgroundImageUrl,
      thumbnailUrl: thumbnailImageUrl,
      title: title,
      description: description,
      createdProjectInfoList: createInfoList,
      updatedProjectInfoList: updateInfoList,
      removedProjectInfoList: removeInfoList
    };
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.title !== currentData.title ||
      initialData.description !== currentData.description ||
      (currentData.createdProjectInfoList?.length ?? 0) > 0 ||
      (currentData.updatedProjectInfoList?.length ?? 0) > 0 ||
      (currentData.removedProjectInfoList?.length ?? 0) > 0
    );
  };

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <ProjectDetailContainerComp>
      {isEditMode && project && isChanged(project) &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
      <RepresentImg
        backgroundImg={backgroundImageUrl}
        setBackgroundImg={setBackgroundImageUrl}
        setThumbnailImg={setThumbnailImageUrl}
      />
      <ProjectDetailWrapper>
        <ProjectTitle title={title} setTitle={setTitle} />
        <Divider dividerType={DividerType.PLAIN} />
        {isEditMode ?
          <HeadlessTextArea
            alignment={TextBoxAlignment.LEFT}
            content={description}
            placeholder={"project description"}
            handleChange={(e) => setDescription(e.target.value)}
            StyledTextArea={TextAreaTextBox}
          />
          :
          <Description $textBoxAlignment={TextBoxAlignment.LEFT}>
            {description.split('\n').map((line, index) => (
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