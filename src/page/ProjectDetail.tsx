import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../shared/store';
import { useArtistIdValidation } from '../shared/hooks/useAuiValidation';
import RepresentImg from '../component/projectDetail/RepresentImg';
import ProjectInfo from '../component/projectDetail/ProjectInfo';
import ProjectTitle from '../component/projectDetail/ProjectTitle';
import ProjectElement, { ProjectElementType } from '../component/projectElement/ProjectElement';
import { TextBoxType } from '../component/projectElement/TextBox';
import Divider, { DividerType } from '../shared/Divider';
import projectImg1 from '../asset/project/starship.jpeg'
import projectImg2 from '../asset/project/launches_header_desktop.jpg'
import projectImg3 from '../asset/project/mars.png'
import projectImg4 from '../asset/project/moon.jpg'
import projectImg5 from '../asset/project/starship4th_6.jpeg'


const initialProjectDetailValues = {
  initialBackgroundImg: projectImg1,
  title: 'This is Project Title',
  details: [
    { initialCustomName: '전시 기간', initialCustomValue: '2019.08.01-2019.08.11' },
    { initialCustomName: '전시 장소', initialCustomValue: '국립현대미술관 서울관' },
    { initialCustomName: '후원', initialCustomValue: '서울문화재단' }
  ],
  elements: [
    {
      type: ProjectElementType.WORK,
      content: {
        image: projectImg1,
        title: 'Snow-covered Rock',
        description: 'A large rock formation covered in snow, set against a backdrop of snowy mountains.'
      }
    },
    {
      type: ProjectElementType.WORK,
      content: {
        image: projectImg2,
        title: 'Rocky Outcrop',
        description: 'A prominent rocky outcrop jutting out from a snowy landscape, with a small object (possibly a flag or marker) on top.'
      }
    },
    {
      type: ProjectElementType.WORK,
      content: {
        image: projectImg3,
        title: 'Stone Pile 1',
        description: 'A carefully balanced pile of stones in a snowy environment, creating a natural sculpture.'
      }
    },
    {
      type: ProjectElementType.WORK,
      content: {
        image: projectImg4,
        title: 'Stone Pile 2',
        description: 'Another view of a stone pile, this time with more jagged and complex formations, still set in a snowy landscape.'
      }
    },
    {
      type: ProjectElementType.TEXTBOX,
      content: {
        texBoxType: TextBoxType.CENTER,
        content: '"Put your left hand on the stones"\n\nThis series explores the interaction between human touch and the raw elements of nature. The artist invites viewers to imagine placing their hand on these cold, snow-covered stones, bridging the gap between the observer and the observed.'
      }
    },
    {
      type: ProjectElementType.DIVIDER,
      content: {
        dividerType: DividerType.PLAIN
      }
    },
    {
      type: ProjectElementType.WORK,
      content: {
        image: projectImg5,
        title: 'Mountain Landscape',
        description: 'A expansive view of a mountain range, with misty peaks and valleys creating a dramatic, ethereal atmosphere.'
      }
    },
    {
      type: ProjectElementType.TEXTBOX,
      content: {
        texBoxType: TextBoxType.RIGHT,
        content: 'The "Muth Endap Inam Mo" series captures the essence of a journey through snowy, mountainous terrain. Each image represents a moment of stillness and contemplation in the vast, unforgiving landscape. The artists perspective invites viewers to consider their place in nature and the delicate balance between human presence and the untouched wilderness.'
      }
    }
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
        <Divider dividerType={DividerType.PLAIN} />
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
      <ProjectElementList>
        {projectDetailValue.elements.map((element, index) => (
          <ProjectElement key={index} isEditMode={isEditMode} {...element} />
        ))}
      </ProjectElementList>
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
  margin-bottom: calc(6vw);
`;

const ProjectElementList = styled.article`
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

export default ProjectDetail;