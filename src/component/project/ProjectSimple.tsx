import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useNavigate } from 'react-router-dom';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { useProjectList } from '../../shared/hooks/useApi/useProjectList';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType } from '../../shared/enum/EnumRepository';
import Loading from '../../shared/component/Loading';
import MoleculeImgDivContainer from '../../shared/component/molecule/MoleculeImgDivContainer';
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';

interface ProjectSimpleProps {
  projectId: string;
  initialTitle: string;
  initialDescription: string;
  initialImage: string;
}


const ProjectSimple: React.FC<ProjectSimpleProps> = ({
  projectId,
  initialTitle,
  initialDescription,
  initialImage
  // onSave 
}) => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { isLoading, deleteProject } = useProjectList();
  const { setStandardAlert } = useStandardAlertStore();
  const navigate = useNavigate();

  const moveToProjectDetail = () => {
    if (isEditMode) return;
    navigate(`/${aui}/projects/${projectId}`);
  }

  const handleDelete = async () => {
    const callback = async () => {
      try {
        await deleteProject(aui, { projectId });
      } catch (err) {
      } finally {
      }
    }
    setStandardAlert({
      type: AlertType.CONFIRM,
      position: AlertPosition.TOP,
      content: "Are you sure you want to delete this project?\nThe related project elements will also be deleted.",
      callBack: callback
    });
  }

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <ProjectSimpleComp $isEditMode={isEditMode} onClick={moveToProjectDetail}>
      <ProjectSimpleInfo>
        <ProjectSimpleTitle>{initialTitle}</ProjectSimpleTitle>
        <ProjectSimpleDescription>{initialDescription}</ProjectSimpleDescription>
      </ProjectSimpleInfo>
      <MoleculeImgDivContainer
        backgroundImg={initialImage}
        handleChange={() => { }}
        StyledImgDivContainer={ProjectRepresent}
      />
      {isEditMode &&
        <HeadlessBtn
          value={"Delete"}
          handleClick={handleDelete}
          StyledBtn={BtnDelete}
        />
      }
    </ProjectSimpleComp>
  );
};

const ProjectSimpleComp = styled.div<{ $isEditMode: boolean }>`
  position: relative;

  width: 100%;
  height: 56vh;
  display: flex;
  // align-items: center;
  justify-content: space-between; 
  margin-bottom: 20px;
  // background-color: #EECFBB; /*for dev*/
  cursor: ${props => props.$isEditMode ? "auto" : "pointer"}
`;

const ProjectSimpleInfo = styled.div`
  width: calc(38vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px 20px 20px 6vw;
`;

const ProjectSimpleTitle = styled.h2`
  margin-bottom: 10px;
  text-align: end;
  ${({ theme }) => theme.typography.H_02};
`;

const ProjectSimpleDescription = styled.div`
  text-align: end;
  ${({ theme }) => theme.typography.Body_01_2};
`;

const ProjectRepresent = styled.div<StyledImgDivContainerProps>`
  width: calc(62vw);
  height: 100%;

  background-image: url(${props => props.$backgroundImg});
  background-size: cover;
  background-position: center;
  position: relative;
`;


export default ProjectSimple;
