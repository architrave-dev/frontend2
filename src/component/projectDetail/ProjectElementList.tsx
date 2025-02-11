import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useParams } from 'react-router-dom';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import { ProjectElementType, ModalType } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq } from '../../shared/dto/ReqDtoRepository';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import ProjectElement from '../../component/projectElement/ProjectElement';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import Space from '../../shared/Space';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { peDividerBuilder, peDocBuilder, peTextBoxBuilder, peWorkBuilder } from '../../shared/converter/entityBuilder';


const ProjectElementList: React.FC = () => {
  const { aui } = useAui();
  const { projectId } = useParams<{ projectId: string }>();
  const { isEditMode } = useEditMode();
  const { project } = useProjectDetail();
  const { getSimpleWorkList } = useWorkList();
  const { projectElementList, getProjectElementList, createProjectElement } = useProjectElement();
  const { setStandardModal } = useModalStore();

  useEffect(() => {
    const getProjectElementListWithApi = async () => {
      if (aui && projectId) {
        await getProjectElementList(aui, projectId);
      }
    }
    getProjectElementListWithApi();
  }, [aui, projectId]);

  if (!project) return null;

  const handleCreateElement = async (elementType: ProjectElementType) => {
    let newElement: CreateProjectElementReq;
    switch (elementType) {
      case ProjectElementType.WORK:
        newElement = peWorkBuilder(project.id);
        break;
      case ProjectElementType.DOCUMENT:
        newElement = peDocBuilder(project.id);
        break;
      case ProjectElementType.TEXTBOX:
        newElement = peTextBoxBuilder(project.id);
        break;
      case ProjectElementType.DIVIDER:
        newElement = peDividerBuilder(project.id);
        break;
      default:
        throw new Error(`Unsupported ProjectElementType: ${elementType}`);
    }
    await createProjectElement(aui, newElement)
  };

  const handleImportElement = async () => {
    await getSimpleWorkList(aui);
    setStandardModal({
      modalType: ModalType.WORK_STATION,
      title: null,
      value: null,
      handleChange: () => { }
    });
  }

  const openSimpleWorkForCreateDetail = async () => {
    await getSimpleWorkList(aui);
    setStandardModal({
      modalType: ModalType.TEMP_WORK,
      title: null,
      value: null,
      handleChange: () => { }
    });
  }

  return (
    <ProjectElementListComp>
      {projectElementList.map((each, index) => (
        <ProjectElement
          key={index}
          data={each}
        />
      ))}
      {isEditMode && (
        <Space $align={"center"} $height={"calc(6vw)"}>
          <CreateButtonGroup>
            <HeadlessBtn
              value={"Import"}
              handleClick={() => handleImportElement()}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Work"}
              handleClick={() => handleCreateElement(ProjectElementType.WORK)}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Detail"}
              handleClick={() => openSimpleWorkForCreateDetail()}
              StyledBtn={BtnCreate}
            />
            <HeadlessBtn
              value={"Doc"}
              handleClick={() => handleCreateElement(ProjectElementType.DOCUMENT)}
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