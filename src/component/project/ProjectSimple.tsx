import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useNavigate } from 'react-router-dom';
import { useEditMode } from '../../shared/hooks/useEditMode';

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
  const navigate = useNavigate();

  const moveToProjectDetail = () => {
    if (isEditMode) return;
    navigate(`/${aui}/projects/${initialTitle}`);
  }
  return (
    <ProjectSimpleComp $isEditMode={isEditMode} onClick={moveToProjectDetail}>
      <ProjectSimpleInfo>
        <ProjectSimpleTitle>{initialTitle}</ProjectSimpleTitle>
        <ProjectSimpleDescription>{initialDescription}</ProjectSimpleDescription>
      </ProjectSimpleInfo>
      <ProjectRepresent $backgroundimage={initialImage} />
    </ProjectSimpleComp>
  );
};

const ProjectSimpleComp = styled.div<{ $isEditMode: boolean }>`
  position: relative;

  width: 100%;
  height: 56vh;
  display: flex;
  align-items: center;
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
  ${({ theme }) => theme.typography.Body_01};
`;

const ProjectRepresent = styled.div<{ $backgroundimage: string }>`
  width: calc(62vw);
  height: 100%;

  background-image: url(${props => props.$backgroundimage});
  background-size: cover;
  background-position: center;
  position: relative;
`;


export default ProjectSimple;
