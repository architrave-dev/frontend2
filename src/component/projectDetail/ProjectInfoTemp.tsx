import React from 'react';
import styled from 'styled-components';
import { useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';
import { InputNameNew, InputValueNew } from '../../shared/component/headless/input/InputBody';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../../shared/component/headless/button/BtnBody';

interface ProjectInfoTempProps {
  tempId: string;
  initialCustomName: string;
  initialCustomValue: string;
}

const ProjectInfoTemp: React.FC<ProjectInfoTempProps> = ({
  tempId,
  initialCustomName,
  initialCustomValue
}) => {
  const { createInfoList, setCreateInfoList } = useProjectInfoListStoreForUpdate();


  const handleChange = (field: keyof CreateProjectInfoReq, value: string) => {
    const newCreateInfoList: CreateProjectInfoReq[] = createInfoList.map(each =>
      each.tempId === tempId ? { ...each, [field]: value } : each
    )
    setCreateInfoList(newCreateInfoList);
  }

  const handleDelete = () => {
    const filteredList = createInfoList.filter((each) => each.tempId !== tempId);
    setCreateInfoList(filteredList);
  };

  return (
    <ProjectInfoItem>
      <HeadlessInput
        value={initialCustomName}
        placeholder={"Enter info"}
        handleChange={(e) => handleChange("customName", e.target.value)}
        StyledInput={InputNameNew}
      />
      <HeadlessInput
        value={initialCustomValue}
        placeholder={"Enter value"}
        handleChange={(e) => handleChange("customValue", e.target.value)}
        StyledInput={InputValueNew}
      />
      <HeadlessBtn
        value={"Delete"}
        handleClick={handleDelete}
        StyledBtn={BtnDelete}
      />
    </ProjectInfoItem>
  );
};

const ProjectInfoItem = styled.div`
  display: flex;
  height: 40px;
  gap: 20px;
`;


export default ProjectInfoTemp;