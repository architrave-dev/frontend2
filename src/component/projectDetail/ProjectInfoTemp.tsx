import React from 'react';
import styled from 'styled-components';
import { useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';
import DeleteButton from '../../shared/component/DeleteButton';
import InfoInput, { InputType } from '../../shared/component/InfoInput';

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


  const handlechange = (field: keyof CreateProjectInfoReq, value: string) => {
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
      <InfoInput
        type={InputType.NAME_NEW}
        value={initialCustomName}
        placeholder={'Enter info'}
        handlechange={(e) => handlechange("customName", e.target.value)}
      />
      <InfoInput
        type={InputType.VALUE_NEW}
        value={initialCustomValue}
        placeholder={'Enter value'}
        handlechange={(e) => handlechange("customValue", e.target.value)}
      />
      <DeleteButton handleDelete={handleDelete} />
    </ProjectInfoItem>
  );
};

const ProjectInfoItem = styled.div`
  display: flex;
  height: 40px;
  gap: 20px;
`;


export default ProjectInfoTemp;