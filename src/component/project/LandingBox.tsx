import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useLandingBox } from '../../shared/hooks/useLandingBox';
import defaultImg from '../../asset/project/default_1.png';
import { useAui } from '../../shared/hooks/useAui';
import { LandingBoxData } from '../../shared/store/landingBoxStore';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import ConfirmButton from '../../shared/component/ConfirmButton';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextBoxAlignment } from '../../shared/component/SelectBox';
import { TextAreaBilboard } from '../../shared/component/headless/textarea/TextAreaBody';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputBilboard } from '../../shared/component/headless/input/InputBody';


const LandingBox: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { isLoading, landingBox, getLandingBox, updateLandingBox } = useLandingBox();
  const [title, setTitle] = useState(landingBox?.title);
  const [description, setDescription] = useState(landingBox?.description);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(landingBox?.originUrl);

  const { aui } = useAui();

  useEffect(() => {
    if (!aui) return;
    try {
      getLandingBox(aui);
    } catch (error) {
      console.error('get LandingBox failed:', error);
    }
  }, [aui]);

  useEffect(() => {
    if (landingBox) {
      setTitle(landingBox.title);
      setDescription(landingBox.description);
      setBackgroundImageUrl(landingBox.originUrl);
    }
  }, [landingBox]);


  if (!landingBox) {
    return null;
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const isChanged = (initialData: LandingBoxData, currentData: LandingBoxData): boolean => {
    return (
      initialData.title !== currentData.title ||
      initialData.description !== currentData.description ||
      initialData.originUrl !== currentData.originUrl
    );
  };


  const handleConfirm = async () => {
    if (!landingBox) return;

    if (!(backgroundImageUrl && title && description)) {
      return;
    }
    const updatedData: LandingBoxData = {
      id: landingBox.id,
      originUrl: backgroundImageUrl,
      title: title,
      description: description,
      isDeleted: false,
    };

    await updateLandingBox(aui, updatedData);
    setEditMode(false);
  };

  return (
    <Container $backgroundimage={backgroundImageUrl === '' ? defaultImg : backgroundImageUrl}>
      {isEditMode ? (
        <>
          <ReplaceImageButton setBackgroundImageUrl={setBackgroundImageUrl} />
          <HeadlessInput
            type={'text'}
            value={title ? title : ''}
            handleChange={handleTitleChange}
            placeholder={"Enter title"}
            StyledInput={InputBilboard}
          />
          <HeadlessTextArea
            alignment={TextBoxAlignment.LEFT}
            content={description ? description : ''}
            placeholder={"Enter description"}
            handleChange={handleDescriptionChange}
            StyledTextArea={TextAreaBilboard}
          />
          {backgroundImageUrl && title && description &&
            isChanged(landingBox, {
              id: landingBox.id,
              originUrl: backgroundImageUrl,
              title: title,
              description: description,
              isDeleted: false,
            }) &&
            <ConfirmButton handleConfirm={handleConfirm} />
          }
        </>
      ) : (
        <>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ $backgroundimage: string | undefined }>`
  position: relative;

  background-image: url(${props => props.$backgroundimage});
  background-size: cover;
  background-position: center;

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 6vw;
`;

const Title = styled.h1`
max-width: 60vw;
padding: 0.5rem;
margin-bottom: 20px;
${({ theme }) => theme.typography.H_01};
`;

const Description = styled.p`
max-width: 70vw;
min-height: 7vh;
margin-bottom: 20px;
padding: 0.5rem;
${({ theme }) => theme.typography.Body_01};
`;


export default LandingBox;
