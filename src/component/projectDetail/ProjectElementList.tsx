import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useParams } from 'react-router-dom';
import { useModal } from '../../shared/hooks/useModal';
import { useProjectElement } from '../../shared/hooks/useApi/useProjectElement';
import { useProjectElementListStoreForUpdate } from '../../shared/store/projectElementStore';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { BtnCreate } from '../../shared/component/headless/button/BtnBody';
import { DividerType, ProjectElementType, TextAlignment, DisplayAlignment, WorkDisplaySize, WorkType, ModalType } from '../../shared/enum/EnumRepository';
import { CreateProjectElementReq } from '../../shared/dto/ReqDtoRepository';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import ProjectElement from '../../component/projectElement/ProjectElement';
import ProjectElementTemp from '../projectElement/ProjectElementTemp';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import Space from '../../shared/Space';
import Loading from '../../shared/component/Loading';


const ProjectElementList: React.FC = () => {
  const { aui } = useAui();
  const { projectId } = useParams<{ projectId: string }>();
  const { isEditMode } = useEditMode();
  const { project } = useProjectDetail();
  const { getSimpleWorkList } = useWorkList();
  const { isLoading, projectElementList, getProjectElementList } = useProjectElement();
  const {
    createdProjectElements,
    setCreatedProjectElements
  } = useProjectElementListStoreForUpdate();

  const { openModal } = useModal();

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
          material: "",
          prodYear: new Date().getFullYear().toString(),
          price: '',
          collection: ''
        } : null,
      workAlignment: elementType === ProjectElementType.WORK ? DisplayAlignment.CENTER : null,
      workDisplaySize: elementType === ProjectElementType.WORK ? WorkDisplaySize.BIG : null,

      // TextBox
      createTextBoxReq: elementType === ProjectElementType.TEXTBOX ? {
        content: "New TextBox"
      } : null,
      textBoxAlignment: elementType === ProjectElementType.TEXTBOX ? TextAlignment.CENTER : null,

      // DOC
      createDocumentReq: elementType === ProjectElementType.DOCUMENT ? {
        originUrl: '',
        thumbnailUrl: '',
        description: "New Doc",
      } : null,
      documentAlignment: elementType === ProjectElementType.DOCUMENT ? TextAlignment.CENTER : null,

      // Divider
      dividerType: elementType === ProjectElementType.DIVIDER ? DividerType.PLAIN : null
    };

    setCreatedProjectElements([...createdProjectElements, newElement]);
  };

  const handleImportElement = async (elementType: ProjectElementType) => {
    try {
      await getSimpleWorkList(aui);
      openModal(ModalType.WORK_STATION);
    } catch (err) {
    } finally {
    }
  }

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <ProjectElementListComp>
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
          document={each.document}
          documentAlignment={each.documentAlignment}
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
                value={"Import"}
                handleClick={() => handleImportElement(ProjectElementType.WORK)}
                StyledBtn={BtnCreate}
              />
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