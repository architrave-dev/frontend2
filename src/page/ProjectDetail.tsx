import React, { useState } from 'react';
import styled from 'styled-components';
import { useArtistIdValidation } from '../shared/hooks/useAuiValidation';
import RepresentImg from '../component/projectDetail/RepresentImg';
import ProjectInfo from '../component/projectDetail/ProjectInfo';
import ProjectTitle from '../component/projectDetail/ProjectTitle';
import { useAuthStore } from '../shared/store';
import projectImg from '../asset/project/starship.jpeg'
import Divider, { EnumType } from '../shared/Divider';


const initialProjectDetailValues = {
  initialBackgroundImg: projectImg,
  title: 'MUH EMDAP INAM MO',
  details: [
    { initialCustomName: '전시 기간', initialCustomValue: '2019.08.01-2019.08.11' },
    { initialCustomName: '전시 장소', initialCustomValue: '국립현대미술관 서울관' },
    { initialCustomName: '후원', initialCustomValue: '서울문화재단' }
  ]
};

const ProjectDetail: React.FC = () => {
  const AUI = useArtistIdValidation();
  const isEditMode = useAuthStore((state) => state.isEditMode);
  const setIsEditMode = useAuthStore((state) => state.setIsEditMode);

  const [projectDetailValue, setProjectDetailValue] = useState(initialProjectDetailValues);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <ProjectDetailPage>
      <button onClick={toggleEditMode}>
        임시 editmode 변경
      </button>
      <RepresentImg initialBackgroundImg={projectDetailValue.initialBackgroundImg} isEditMode={isEditMode} />
      <ProjectDetailContainer>
        <ProjectTitle
          initialTitle={projectDetailValue.title}
          isEditMode={isEditMode}
        />
        <Divider dividerType={EnumType.PLAIN} />
        <ProjectInfoList>
          {projectDetailValue.details.map((detail, index) => (
            <ProjectInfo
              key={index}
              initialCustomName={detail.initialCustomName}
              initialCustomValue={detail.initialCustomValue}
              isEditMode={isEditMode}
            />
          ))}
        </ProjectInfoList>
      </ProjectDetailContainer>
    </ProjectDetailPage>
  );
}

const ProjectDetailPage = styled.div`
  width: 100vw;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ProjectDetailContainer = styled.section`
  padding: calc(8vh) calc(10vw);
`;

const ProjectInfoList = styled.article`
`;

export default ProjectDetail;