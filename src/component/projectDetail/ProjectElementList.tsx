import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectElement from '../../component/projectElement/ProjectElement';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useAui } from '../../shared/hooks/useAui';
import { useParams } from 'react-router-dom';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import ProjectElementTemp from '../projectElement/ProjectElementTemp';
import Space from '../../shared/Space';
import { BtnConfirm, BtnCreate } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { DividerType, ProjectElementType, TextBoxAlignment, WorkAlignment, WorkDisplaySize, WorkType } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq, UpdateProjectElementListReq } from '../../shared/dto/ReqDtoRepository';
import Loading from '../../shared/component/Loading';


const ProjectElementList: React.FC = () => {
  const { AUI, projectId } = useParams<{ AUI: string, projectId: string }>();
  const { isEditMode, setEditMode } = useEditMode();
  const { project } = useProjectDetail();
  const { isLoading, projectElementList, getProjectElementList, updateProjectElementList } = useProjectElement();
  const { createdProjectElements, setCreatedProjectElements, updatedProjectElements, removedProjectElements } = useProjectElementListStoreForUpdate();
  const { aui } = useAui();

  useEffect(() => {
    const getProjectElementListWithApi = async () => {
      if (aui && projectId) {
        try {
          await getProjectElementList(aui, projectId);
        } catch (error) { }
      }
    }
    getProjectElementListWithApi();
  }, [aui, projectId]);

  const handleCreateElement = (elementType: ProjectElementType) => {
    if (!project) {
      return;
    }
    const newElement: CreateProjectElementReq = {
      tempId: Math.floor(Math.random() * 100) + "",
      projectId: project.id,
      projectElementType: elementType,
      // Work
      createWorkReq: elementType === ProjectElementType.WORK ?
        {
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
          prodYear: new Date().getFullYear().toString()
        } : null,
      workAlignment: elementType === ProjectElementType.WORK ? WorkAlignment.CENTER : null,
      workDisplaySize: elementType === ProjectElementType.WORK ? WorkDisplaySize.BIG : null,

      // TextBox
      createTextBoxReq: elementType === ProjectElementType.TEXTBOX ? {
        content: "New TextBox"
      } : null,
      textBoxAlignment: elementType === ProjectElementType.TEXTBOX ? TextBoxAlignment.CENTER : null,

      // DOC
      createDocumentReq: elementType === ProjectElementType.DOC ? {
        originUrl: '',
        thumbnailUrl: '',
        description: "New Doc",
      } : null,
      documentAlignment: elementType === ProjectElementType.DOC ? WorkAlignment.CENTER : null,

      // Divider
      dividerType: elementType === ProjectElementType.DIVIDER ? DividerType.PLAIN : null
    };

    setCreatedProjectElements([...createdProjectElements, newElement]);
  };

  const handleConfirm = async () => {
    if (!projectElementList || !project) return;

    const updatedData: UpdateProjectElementListReq = {
      projectId: project.id,
      peIndexList: [],
      createProjectElements: createdProjectElements,
      updatedProjectElements: updatedProjectElements,
      removedProjectElements: removedProjectElements
    }
    try {
      await updateProjectElementList(aui, updatedData);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  }

  const isChanged = (): boolean => {
    return (
      createdProjectElements.length > 0 ||
      updatedProjectElements.length > 0 ||
      removedProjectElements.length > 0
    );
  }

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <ProjectElementListComp>
      {isEditMode && isChanged() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
      {projectElementList.map((each, index) => (
        <ProjectElement
          key={index}
          id={each.id}
          projectElementType={each.projectElementType}
          work={each.work}
          workAlignment={each.workAlignment}
          workDisplaySize={each.workDisplaySize}
          textBox={each.textBox}
          textBoxAlignment={each.textBoxAlignment}
          dividerType={each.dividerType}
        />
      ))}
      {isEditMode && (
        <>
          {createdProjectElements.map((each) => (
            <ProjectElementTemp
              key={each.tempId}
              tempId={each.tempId}
              projectId={each.projectId}
              projectElementType={each.projectElementType}
              createWorkReq={each.createWorkReq}
              workAlignment={each.workAlignment}
              workDisplaySize={each.workDisplaySize}
              createTextBoxReq={each.createTextBoxReq}
              textBoxAlignment={each.textBoxAlignment}
              createDocumentReq={each.createDocumentReq}
              documentAlignment={each.documentAlignment}
              dividerType={each.dividerType}
            />
          ))}
          <Space $align={"center"} $height={"calc(6vw)"}>
            <CreateButtonGroup>
              <HeadlessBtn
                value={"Work"}
                handleClick={() => handleCreateElement(ProjectElementType.WORK)}
                StyledBtn={BtnCreate}
              />
              <HeadlessBtn
                value={"Detail"}
                handleClick={() => handleCreateElement(ProjectElementType.DETAIL)}
                StyledBtn={BtnCreate}
              />
              <HeadlessBtn
                value={"Doc"}
                handleClick={() => handleCreateElement(ProjectElementType.DOC)}
                StyledBtn={BtnCreate}
              />
              <HeadlessBtn
                value={"Text"}
                handleClick={() => handleCreateElement(ProjectElementType.TEXTBOX)}
                StyledBtn={BtnCreate}
              />
              <HeadlessBtn
                value={"Divider"}
                handleClick={() => handleCreateElement(ProjectElementType.DIVIDER)}
                StyledBtn={BtnCreate}
              />
            </CreateButtonGroup>
          </Space>
        </>
      )}
    </ProjectElementListComp>
  );
}

const ProjectElementListComp = styled.article`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(4vh) calc(10vw) calc(8vh) calc(10vw);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CreateButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;


export default ProjectElementList;