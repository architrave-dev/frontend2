import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import defaultImg from '../../asset/project/default_1.png';
import MemberInfoEach from '../about/MemberInfoEach';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import { CreateWorkReq, WorkData } from '../../shared/store/WorkListStore';
import { convertSizeToString, convertStringToSize } from '../../shared/store/projectElementStore';
import Divider, { DividerType } from '../../shared/Divider';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { useWorkList } from '../../shared/hooks/useApi/useWorkList';
import { BtnWorkDelete } from '../../shared/component/headless/button/BtnBody';

const WorkViewer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { aui } = useAui();
  const { updateWork, createWork, deleteWork } = useWorkList();
  const { activeWork, setActiveWork, clearActiveWork } = useWorkViewStore();
  const { updatedActiveWork, setUpdatedActiveWork } = useWorkViewStoreForUpdate();

  if (!activeWork || !updatedActiveWork) return null;

  const handleChange = (field: keyof WorkData, value: string) => {
    if (field === 'size')
      setUpdatedActiveWork({ ...updatedActiveWork, [field]: convertStringToSize(value) });
    else
      setUpdatedActiveWork({ ...updatedActiveWork, [field]: value });
  }

  const isChanged = (initialData: WorkData, currentData: WorkData): boolean => {
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.thumbnailUrl !== currentData.thumbnailUrl ||
      initialData.title !== currentData.title ||
      initialData.size !== currentData.size ||
      initialData.material !== currentData.material ||
      initialData.prodYear !== currentData.prodYear ||
      initialData.description !== currentData.description
    );
  };

  const handleConfirm = async () => {
    if (!isChanged(activeWork, updatedActiveWork)) {
      return;
    }
    try {
      await updateWork(aui, updatedActiveWork);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  const handleCreateWork = async () => {
    const newWork: CreateWorkReq = {
      originUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      thumbnailUrl: process.env.REACT_APP_DEFAULT_IMG || '',
      title: "New Work",
      description: "This is New Work",
      size: {
        width: "000",
        height: "000"
      },
      material: "material",
      prodYear: new Date().getFullYear().toString()
    }
    try {
      await createWork(aui, newWork);
    } catch (err) { };
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this work?")) {
      try {
        await deleteWork(aui, { id: updatedActiveWork.id });
      } catch (err) {
      } finally {
        clearActiveWork();
        setEditMode(false);
      }

    }
  };

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    setUpdatedActiveWork({
      ...updatedActiveWork,
      originUrl,
      thumbnailUrl,
    });
  }

  return (
    <WorkViewComp>
      <ImgWrapper>
        <WorkImage src={updatedActiveWork.originUrl === '' ? defaultImg : updatedActiveWork.originUrl} alt={updatedActiveWork.title} />
        <ReplaceImageButton setImageUrl={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)} />
      </ImgWrapper>
      <Divider dividerType={DividerType.PLAIN} />
      <MemberInfoEach name={"Title"} value={updatedActiveWork.title} handleChange={(e) => handleChange('title', e.target.value)} />
      <MemberInfoEach name={"Size"} value={convertSizeToString(updatedActiveWork.size)} handleChange={(e) => handleChange('size', e.target.value)} />
      <MemberInfoEach name={"Material"} value={updatedActiveWork.material} handleChange={(e) => handleChange('material', e.target.value)} />
      <MemberInfoEach name={"Year"} value={updatedActiveWork.prodYear} handleChange={(e) => handleChange('prodYear', e.target.value)} />
      <MemberInfoEach name={"Description"} value={updatedActiveWork.description} handleChange={(e) => handleChange('prodYear', e.target.value)} />

      {isEditMode &&
        <BtnContainer>
          {/* <HeadlessBtn
          value={"Full"}
          handleClick={handleDelete}
          StyledBtn={BtnCreate}
        /> */}
          <HeadlessBtn
            value={"Create"}
            handleClick={handleCreateWork}
            StyledBtn={BtnWorkDelete}
          />
          <HeadlessBtn
            value={"Confirm"}
            handleClick={handleConfirm}
            StyledBtn={BtnWorkDelete}
          />
          <HeadlessBtn
            value={"Delete"}
            handleClick={handleDelete}
            StyledBtn={BtnWorkDelete}
          />
        </BtnContainer>
      }
    </WorkViewComp>
  );
}

const WorkViewComp = styled.section`
  width: 35vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 6vw;

  padding-top: 100px;
  background-color: #eae7dc;
`;

const ImgWrapper = styled.div`
  position: relative;
  height: 60vh;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 16px;
  background-color: #ffedbf;
`

const WorkImage = styled.img`
  //부모 크기에 맞춤
  width: 100%;
  height: 100%; 
  //이미지 크기에 맞춤
  // max-width: 100%; 
  // max-height: 100%;
  object-fit: contain;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 30px;
`

const Description = styled.div`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: left;
  margin-bottom: 1px;
  ${({ theme }) => theme.typography.Body_03_2};
`;

export default WorkViewer;