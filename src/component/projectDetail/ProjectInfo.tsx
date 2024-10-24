import React from 'react';
import styled from 'styled-components';
import { useProjectInfoListStore, useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { InputName, InputValue } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { RemoveProjectInfoReq, UpdatedProjectInfoReq } from '../../shared/dto/ReqDtoRepository';
import { ProjectInfoData } from '../../shared/dto/EntityRepository';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';

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
  const { updatePiList, setUpdatePiList, removePiList, setRemovePiList } = useProjectInfoListStoreForUpdate();


  const handleChange = (field: keyof UpdatedProjectInfoReq, value: string) => {

    const targetElement = updatePiList.find(info => info.id === projectInfoId);
    if (targetElement) {
      //updatePiList에 있다면
      const updatedProjectInfoList = updatePiList.map(each =>
        each.id === projectInfoId ? { ...each, [field]: value } : each
      )
      setUpdatePiList(updatedProjectInfoList);
    } else {
      //updatePiList에 없다면
      const target = projectInfoList.find(info => info.id === projectInfoId);
      if (!target) return;

      const newUpdatedProjectInfoReq: UpdatedProjectInfoReq = {
        ...target,
        [field]: value
      };
      setUpdatePiList([...updatePiList, newUpdatedProjectInfoReq]);
    }
    const updatedProjectInfoList: ProjectInfoData[] = projectInfoList.map(each =>
      each.id === projectInfoId ? { ...each, [field]: value } : each
    )
    setProjectInfoList(updatedProjectInfoList);
  }


  const handleDelete = () => {
    //이미 update 된 애들일 수도 있어.
    //projectInfoList, updatePiList에서 찾아서 없애고, 
    //removeInfoList에 추가하기.
    const targetElement = updatePiList.find(each => each.id === projectInfoId);
    if (targetElement) {
      const updatedInfoList = updatePiList.filter((each) => each.id !== projectInfoId)
      setUpdatePiList(updatedInfoList);
    }

    const updatedProjectInfoList = projectInfoList.filter((each) => each.id !== projectInfoId)
    setProjectInfoList(updatedProjectInfoList);

    const newRemoveInfo: RemoveProjectInfoReq = { id: projectInfoId };
    setRemovePiList([...removePiList, newRemoveInfo]);
  }

  return (
    <ProjectInfoItem $isEditMode={isEditMode}>
      <MoleculeInputDiv
        value={initialCustomName}
        handleChange={(e) => handleChange("customName", e.target.value)}
        inputStyle={InputName}
        StyledDiv={NameSection}
      />
      <MoleculeInputDiv
        value={initialCustomValue}
        handleChange={(e) => handleChange("customValue", e.target.value)}
        inputStyle={InputValue}
        StyledDiv={ValueSection}
      />
      {isEditMode &&
        <HeadlessBtn
          value={"Delete"}
          handleClick={handleDelete}
          StyledBtn={BtnDelete}
        />}
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
