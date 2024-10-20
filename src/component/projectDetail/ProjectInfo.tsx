import React from 'react';
import styled from 'styled-components';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputName, InputValue } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { RemoveProjectInfoReq, UpdatedProjectInfoReq } from '../../shared/dto/ReqDtoRepository';
import { ProjectInfoData } from '../../shared/dto/EntityRepository';

interface ProjectInfoProps {
  projectInfoId: string;
  initialCustomName: string;
  initialCustomValue: string;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  projectInfoId,
  initialCustomName,
  initialCustomValue }) => {
  const { isEditMode } = useEditMode();
  const { projectInfoList, setProjectInfoList } = useProjectInfoListStore();
  const { updateInfoList, setUpdateInfoList, removeInfoList, setRemoveInfoList } = useProjectInfoListStoreForUpdate();


  const handleChange = (field: keyof UpdatedProjectInfoReq, value: string) => {

    const targetElement = updateInfoList.find(info => info.id === projectInfoId);
    if (targetElement) {
      //updateInfoList에 있다면
      const updatedProjectInfoList = updateInfoList.map(each =>
        each.id === projectInfoId ? { ...each, [field]: value } : each
      )
      setUpdateInfoList(updatedProjectInfoList);
    } else {
      //updateInfoList에 없다면
      const target = projectInfoList.find(info => info.id === projectInfoId);
      if (!target) return;

      const newUpdatedProjectInfoReq: UpdatedProjectInfoReq = {
        ...target,
        [field]: value
      };
      setUpdateInfoList([...updateInfoList, newUpdatedProjectInfoReq]);
    }
    const updatedProjectInfoList: ProjectInfoData[] = projectInfoList.map(each =>
      each.id === projectInfoId ? { ...each, [field]: value } : each
    )
    setProjectInfoList(updatedProjectInfoList);
  }


  const handleDelete = () => {
    //이미 update 된 애들일 수도 있어.
    //projectInfoList, updateInfoList에서 찾아서 없애고, 
    //removeInfoList에 추가하기.
    const targetElement = updateInfoList.find(each => each.id === projectInfoId);
    if (targetElement) {
      const updatedInfoList = updateInfoList.filter((each) => each.id !== projectInfoId)
      setUpdateInfoList(updatedInfoList);
    }

    const updatedProjectInfoList = projectInfoList.filter((each) => each.id !== projectInfoId)
    setProjectInfoList(updatedProjectInfoList);

    const newRemoveInfo: RemoveProjectInfoReq = { id: projectInfoId };
    setRemoveInfoList([...removeInfoList, newRemoveInfo]);
  }

  return (
    <ProjectInfoItem $isEditMode={isEditMode}>
      {isEditMode ? (
        <>
          <HeadlessInput
            value={initialCustomName}
            placeholder={"Enter info"}
            handleChange={(e) => handleChange("customName", e.target.value)}
            StyledInput={InputName}
          />
          <HeadlessInput
            value={initialCustomValue}
            placeholder={"Enter value"}
            handleChange={(e) => handleChange("customValue", e.target.value)}
            StyledInput={InputValue}
          />
          <HeadlessBtn
            value={"Delete"}
            handleClick={handleDelete}
            StyledBtn={BtnDelete}
          />
        </>
      ) : (
        <>
          <NameSection>{initialCustomName}</NameSection>
          <ValueSection>{initialCustomValue}</ValueSection>
        </>
      )}
    </ProjectInfoItem>
  );
}

const ProjectInfoItem = styled.div<{ $isEditMode: boolean }>`
  display: flex;
  height: 40px;
  gap: 20px;
  margin-bottom: ${({ $isEditMode }) => $isEditMode ? '8px' : '10px'};
`;

const NameSection = styled.div`
  width: 18vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ValueSection = styled.div`
  width: 60vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_1};
`;

export default ProjectInfo;
