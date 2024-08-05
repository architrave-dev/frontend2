import React from 'react';
import styled from 'styled-components';
import projectImg from '../../asset/project/starship.jpeg';

interface ProjectSimpleProps {
  title: string;
  description: string;
}


const ProjectSimple: React.FC<ProjectSimpleProps> = ({ title, description }) => {
  return (
    <ProjectSimpleComp>
      <ProjectSimpleInfo>
        <ProjectSimpleTitle>{title}</ProjectSimpleTitle>
        <ProjectSimpleDescription>{description}</ProjectSimpleDescription>
      </ProjectSimpleInfo>
      <ProjectRepresent />
    </ProjectSimpleComp>
  );
};

const ProjectSimpleComp = styled.div`
  width: 100%;
  height: 56vh;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin-bottom: 20px;
  background-color: #EECFBB;
`;

const ProjectSimpleInfo = styled.div`
  width: calc(34vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
`;
const ProjectSimpleTitle = styled.h2`
  margin-bottom: 10px;
  text-align: end;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.font_H02};
`;

const ProjectSimpleDescription = styled.div`
  text-align: end;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.font_B01};
`;

const ProjectRepresent = styled.div`
  width: calc(66vw);
  height: 100%;

  background-image: url(${projectImg});
  background-size: cover;
  background-position: center;
`;


export default ProjectSimple;
