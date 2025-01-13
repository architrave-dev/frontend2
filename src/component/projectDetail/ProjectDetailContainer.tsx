import React from 'react';
import styled from 'styled-components';
import Divider from '../../shared/Divider';
import ProjectInfoList from '../../component/projectDetail/ProjectInfoList';
import { useProjectDetail } from '../../shared/hooks/useApi/useProjectDetail';
import { DividerType, TextAlignment } from '../../shared/enum/EnumRepository';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import MoleculeImgDivContainer from '../../shared/component/molecule/MoleculeImgDivContainer';
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { InputTitle } from '../../shared/component/headless/input/InputBody';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { useProjectStore } from '../../shared/store/projectStore';


const ProjectDetailContainer: React.FC = () => {
  const { project } = useProjectDetail();
  const { updateProject: handleChange, updateImage: handleImageChange } = useProjectStore();
  if (!project) {
    return null;
  }

  return (
    <ProjectDetailContainerComp>
      <MoleculeImgDivContainer
        backgroundImg={convertS3UrlToCloudFrontUrl(project.uploadFile.originUrl)}
        handleChange={handleImageChange}
        StyledImgDivContainer={RepresentImgContainer}
      />
      <ProjectDetailWrapper>
        <MoleculeInputDiv
          value={project.title}
          placeholder={"title"}
          handleChange={(e) => handleChange({ title: e.target.value })}
          inputStyle={InputTitle}
          StyledDiv={Title}
        />
        <Divider dividerType={DividerType.PLAIN} />
        <MoleculeTextareaDescription
          value={project.description}
          handleChange={(e) => handleChange({ description: e.target.value })}
          alignment={TextAlignment.LEFT}
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

const Description = styled.div<{ $textAlignment: TextAlignment }>`
  padding: 9px 0px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $textAlignment = TextAlignment.LEFT }) => getAlignment($textAlignment)};
  ${({ theme }) => theme.typography.Body_02_1};
`;


export default ProjectDetailContainer;