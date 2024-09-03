import React from 'react';
import styled from 'styled-components';
import { ProjectInfoData, useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { RemoveProjectInfoReq, UpdatedProjectInfoReq } from '../../shared/api/projectApi';
import DeleteButton from '../../shared/component/DeleteButton';
import InfoInput, { InputType } from '../../shared/component/InfoInput';

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


  const handlechange = (field: keyof UpdatedProjectInfoReq, value: string) => {

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
          <InfoInput
            type={InputType.NAME}
            value={initialCustomName}
            placeholder={'Enter info'}
            handlechange={(e) => handlechange("customName", e.target.value)}
          />
          <InfoInput
            type={InputType.VALUE}
            value={initialCustomValue}
            placeholder={'Enter value'}
            handlechange={(e) => handlechange("customValue", e.target.value)}
          />
          <DeleteButton handleDelete={handleDelete} />
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
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ValueSection = styled.div`
  width: 60vw;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default ProjectInfo;
