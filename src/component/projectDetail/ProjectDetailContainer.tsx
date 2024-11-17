import React from 'react';
import styled from 'styled-components';
import Divider from '../../shared/Divider';
import ProjectInfoList from '../../component/projectDetail/ProjectInfoList';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { useAui } from '../../shared/hooks/useAui';
import { useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import Loading from '../../shared/component/Loading';
import { DividerType, TextBoxAlignment } from '../../shared/enum/EnumRepository';
import { UpdateProjectReq } from '../../shared/dto/ReqDtoRepository';
import { IndexData, ProjectData } from '../../shared/dto/EntityRepository';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { useProjectStoreForUpdate } from '../../shared/store/projectStore';
import MoleculeImgDivContainer from '../../shared/component/molecule/MoleculeImgDivContainer';
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { InputTitle } from '../../shared/component/headless/input/InputBody';

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
      project.thumbnailUrl !== updatedProjectDto.thumbnailUrl ||
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
      {isEditMode && isChanged() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
      <MoleculeImgDivContainer
        backgroundImg={updatedProjectDto.originUrl}
        handleChange={setOriginThumbnailUrl}
        StyledImgDivContainer={RepresentImgContainer}
      />
      <ProjectDetailWrapper>
        <MoleculeInputDiv
          value={updatedProjectDto.title}
          handleChange={(e) => handleChange('title', e.target.value)}
          inputStyle={InputTitle}
          StyledDiv={Title}
        />
        <Divider dividerType={DividerType.PLAIN} />
        <MoleculeTextareaDescription
          value={updatedProjectDto.description}
          handleChange={(e) => handleChange('description', e.target.value)}
          alignment={TextBoxAlignment.LEFT}
          StyledTextarea={TextAreaTextBox}
          StyledDescription={Description}
        />
        <ProjectInfoList />
      </ProjectDetailWrapper>
    </ProjectDetailContainerComp>
  );
}

const ProjectDetailContainerComp = styled.section`
  position: relative;
`;

const Title = styled.div`
  padding: 4px 0px;
  margin-bottom: 1px;
  ${({ theme }) => theme.typography.H_015};
`;

const RepresentImgContainer = styled.div<StyledImgDivContainerProps>`
  position: relative;
  background-image: url(${props => props.$backgroundImg});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

const ProjectDetailWrapper = styled.article`
  padding: calc(8vh) calc(10vw) calc(4vh) calc(10vw);
`;

const Description = styled.div<{ $textBoxAlignment: TextBoxAlignment }>`
  padding: 9px 0px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $textBoxAlignment = TextBoxAlignment.LEFT }) => getAlignment($textBoxAlignment)};
  ${({ theme }) => theme.typography.Body_02_1};
`;


export default ProjectDetailContainer;