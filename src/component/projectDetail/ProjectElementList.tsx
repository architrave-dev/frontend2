import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import ProjectElement from '../../component/projectElement/ProjectElement';
import { useProjectElement } from '../../shared/hooks/useProjectElement';
import { useAui } from '../../shared/hooks/useAui';
import { useParams } from 'react-router-dom';
import { CreateProjectElementReq, ProjectElementType, TextBoxAlignment, WorkAlignment, useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { UpdateProjectElementListReq } from '../../shared/api/projectElementApi';
import { useProjectDetail } from '../../shared/hooks/useProjectDetail';
import ProjectElementTemp from '../projectElement/ProjectElementTemp';
import { DividerType } from '../../shared/Divider';
import defaultImg from '../../asset/project/mars.png';
import Space from '../../shared/Space';


const ProjectElementList: React.FC = () => {
  const { AUI, projectTitle } = useParams<{ AUI: string, projectTitle: string }>();
  const { isEditMode, setEditMode } = useEditMode();
  const { project } = useProjectDetail();
  const { isLoading, error, projectElementList, getProjectElementList, updateProjectElementList } = useProjectElement();
  const { createdProjectElements, setCreatedProjectElements, updatedProjectElements, removedProjectElements } = useProjectElementListStoreForUpdate();
  const { aui } = useAui();

  useEffect(() => {
    const getProjectElementListWithApi = async () => {
      if (aui && projectTitle) {
        try {
          await getProjectElementList(aui, projectTitle);
        } catch (error) {
          console.error('get ProjectElementList failed:', error);
        }
      }
    }
    getProjectElementListWithApi();
  }, [aui, projectTitle]);

  const handleCreateElement = (elementType: ProjectElementType) => {
    if (!project) {
      return;
    }
    const newElement: CreateProjectElementReq = {
      tempId: Math.floor(Math.random() * 100) + "",
      projectId: project.id,
      projectElementType: elementType,
      createWorkReq: elementType === ProjectElementType.WORK ?
        {
          originUrl: defaultImg,
          thumbnailUrl: defaultImg,
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
      createTextBoxReq: elementType === ProjectElementType.TEXTBOX ? {
        content: "This is New TextBox"
      } : null,
      textBoxAlignment: elementType === ProjectElementType.TEXTBOX ? TextBoxAlignment.CENTER : null,
      dividerType: elementType === ProjectElementType.DIVIDER ? DividerType.PLAIN : null,
      peOrder: (createdProjectElements.length + projectElementList.length).toString(),
    };

    setCreatedProjectElements([...createdProjectElements, newElement]);
  };

  const handleConfirm = async () => {
    if (!projectElementList || !project) return;

    const updatedData: UpdateProjectElementListReq = {
      projectId: project.id,
      createProjectElements: createdProjectElements,
      updatedProjectElements: updatedProjectElements,
      removedProjectElements: removedProjectElements
    }

    await updateProjectElementList(aui, updatedData);
    setEditMode(false);
  }

  const isChanged = (): boolean => {
    return (
      createdProjectElements.length > 0 ||
      updatedProjectElements.length > 0 ||
      removedProjectElements.length > 0
    );
  }

  return (
    <ProjectElementListComp>
      {isEditMode && isChanged()
        // && projectElementList
        ? <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton> : null
      }
      {projectElementList.map((each, index) => (
        <ProjectElement
          key={index}
          id={each.id}
          projectElementType={each.projectElementType}
          work={each.work}
          workAlignment={each.workAlignment}
          textBox={each.textBox}
          textBoxAlignment={each.textBoxAlignment}
          dividerType={each.dividerType}
        // order={each.order}
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
              work={each.createWorkReq}
              workAlignment={each.workAlignment}
              textBox={each.createTextBoxReq}
              textBoxAlignment={each.textBoxAlignment}
              dividerType={each.dividerType}
            />
          ))}
          <Space $align={"center"} $height={"calc(6vw)"}>
            <CreateButtonGroup>
              <CreateButton onClick={() => handleCreateElement(ProjectElementType.WORK)}>Work</CreateButton>
              <CreateButton onClick={() => handleCreateElement(ProjectElementType.TEXTBOX)}>Text</CreateButton>
              <CreateButton onClick={() => handleCreateElement(ProjectElementType.DIVIDER)}>Divider</CreateButton>
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
  margin-bottom: 120px;
  padding: 0 calc(10vw);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ConfirmButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.color_White};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const CreateButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CreateButton = styled.button`
  width: 100px;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.color_White};
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_05};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.color_Gray_06};
  }
`;





export default ProjectElementList;