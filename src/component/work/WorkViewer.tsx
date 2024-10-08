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
import { useWorkList } from '../../shared/hooks/useWorkList';
import { BtnConfirm, BtnCreate } from '../../shared/component/headless/button/BtnBody';

const WorkViewer: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { aui } = useAui();
  const { updateWork, createWork } = useWorkList();
  const { activeWork, setActiveWork } = useWorkViewStore();
  const { updatedActiveWork, setUpdatedActiveWork } = useWorkViewStoreForUpdate();

  if (!activeWork || !updatedActiveWork) return null;


  const handleChange = (field: keyof WorkData, value: string) => {
    if (field == 'size')
      setUpdatedActiveWork({ ...updatedActiveWork, [field]: convertStringToSize(value) });
    else
      setUpdatedActiveWork({ ...updatedActiveWork, [field]: value });
  }

  const isChanged = (initialData: WorkData, currentData: WorkData): boolean => {
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.title !== currentData.title ||
      initialData.size !== currentData.size ||
      initialData.material !== currentData.material ||
      initialData.prodYear !== currentData.prodYear ||
      initialData.description !== currentData.description
    );
  };

  const handleConfirm = async () => {
    await updateWork(aui, updatedActiveWork);
    setEditMode(false);
  };

  const handleCreateWork = () => {
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
    createWork(aui, newWork);
  };

  return (
    <WorkViewComp>
      <ImgWrapper>
        <WorkImage src={updatedActiveWork.originUrl === '' ? defaultImg : updatedActiveWork.originUrl} alt={updatedActiveWork.title} />
        <ReplaceImageButton setBackgroundImageUrl={(imageUrl: string) => handleChange('originUrl', imageUrl)} />
      </ImgWrapper>
      <Divider dividerType={DividerType.PLAIN} />
      <MemberInfoEach name={"Title"} value={updatedActiveWork.title} handleChange={(e) => handleChange('title', e.target.value)} />
      <MemberInfoEach name={"Size"} value={convertSizeToString(updatedActiveWork.size)} handleChange={(e) => handleChange('size', e.target.value)} />
      <MemberInfoEach name={"Material"} value={updatedActiveWork.material} handleChange={(e) => handleChange('material', e.target.value)} />
      <MemberInfoEach name={"Year"} value={updatedActiveWork.prodYear} handleChange={(e) => handleChange('prodYear', e.target.value)} />
      <MemberInfoEach name={"Description"} value={updatedActiveWork.description} handleChange={(e) => handleChange('prodYear', e.target.value)} />

      {isEditMode &&
        <HeadlessBtn
          value={"Create"}
          handleClick={handleCreateWork}
          StyledBtn={BtnCreate}
        />}
      {isEditMode && isChanged(activeWork, updatedActiveWork) &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
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
`

const WorkImage = styled.img`
  max-width: 100%;
  max-height: 100%;
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