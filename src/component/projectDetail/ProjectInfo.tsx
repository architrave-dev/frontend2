import React from 'react';
import styled from 'styled-components';
import { useProjectInfoListStore } from '../../shared/store/projectInfoStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { InputName, InputValue } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';
import { UpdateProjectInfoReq } from '../../shared/dto/ReqDtoRepository';
import { ProjectInfoData } from '../../shared/dto/EntityRepository';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { useProjectInfo } from '../../shared/hooks/useApi/useProjectInfo';
import { useAui } from '../../shared/hooks/useAui';

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
  const { updateProjectInfo, deleteProjectInfo } = useProjectInfo();
  const { aui } = useAui();

  const handleChange = (field: keyof UpdateProjectInfoReq, value: string) => {
    const updatedProjectInfoList: ProjectInfoData[] = projectInfoList.map(each =>
      each.id === projectInfoId ? { ...each, [field]: value } : each
    )
    setProjectInfoList(updatedProjectInfoList);
  }

  const handleUpdate = async () => {
    try {
      const updatePiReq: UpdateProjectInfoReq = {
        id: projectInfoId,
        customName: initialCustomName,
        customValue: initialCustomValue
      }
      await updateProjectInfo(aui, updatePiReq);
    } catch (err) {
    } finally {
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProjectInfo(aui, { id: projectInfoId });
      const newUpdatePiList = projectInfoList.filter((pi) => pi.id !== projectInfoId);

      setProjectInfoList(newUpdatePiList);
    } catch (err) {
    }
  }

  return (
    <ProjectInfoItem $isEditMode={isEditMode}>
      <MoleculeInputDiv
        value={initialCustomName}
        placeholder={"name"}
        handleChange={(e) => handleChange("customName", e.target.value)}
        inputStyle={InputName}
        StyledDiv={NameSection}
      />
      <MoleculeInputDiv
        value={initialCustomValue}
        placeholder={"value"}
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
  position: relative;
  display: flex;
  height: 40px;
  gap: 40px;
  margin-bottom: ${({ $isEditMode }) => $isEditMode ? '10px' : '10px'};
`;

const NameSection = styled.div`
  width: 14vw;
  display: flex;
  align-items: center;
  padding: 5px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_03_2};
`;

const ValueSection = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  padding: 5px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_03_1};
`;

export default ProjectInfo;
