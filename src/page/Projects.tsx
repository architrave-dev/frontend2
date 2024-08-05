import React, { useState } from 'react';
import styled from 'styled-components';
import LandingBox from '../component/LandingBox';
import ProjectSimple from '../component/project/ProjectSimple';
import projectImg from '../asset/project/starship.jpeg'

const projectItems = [
  { idx: 0, title: "Project Title 1", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 1, title: "Project Title 2", description: "This is Project description.This is Project description.This is Project description." },
  { idx: 2, title: "Project Title 3", description: "This is Project description.This is Project description.This is Project description." }
];


const Projects: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(true);

  const [title, setTitle] = useState("young's website");
  const [description, setDescription] = useState("Explore our curated collection of contemporary artworks from around the world. Each piece tells a unique story and invites you to experience the artist's vision.");
  const [backgroundImage, setBackgroundImage] = useState(projectImg);

  const handleImageChange = (file: File) => {
    console.log('New image file:', file);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };


  return (
    <ProjectsPage>
      <LandingBox
        initialTitle={title}
        initialDescription={description}
        initialBackgroundImage={backgroundImage}
        isEditMode={isEditMode}
        onImageChange={handleImageChange}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
      />
      <ProjectSimpleList>
        {projectItems.map((each) => (
          <ProjectSimple key={each.idx} title={each.title} description={each.description} />
        ))}
      </ProjectSimpleList>
    </ProjectsPage>


  );
}
const ProjectsPage = styled.div`
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ProjectSimpleList = styled.section`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Projects;
