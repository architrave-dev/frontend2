import React from 'react';
import styled from 'styled-components';
import { useProjectInfoListStoreForUpdate } from '../../shared/store/projectInfoListStore';
import { CreateProjectInfoReq } from '../../shared/api/projectApi';
import DeleteButton from '../../shared/component/DeleteButton';

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
      <NameInput
        value={initialCustomName}
        onChange={(e) => handlechange("customName", e.target.value)}
        placeholder="Enter info"
      />
      <ValueInput
        value={initialCustomValue}
        onChange={(e) => handlechange("customValue", e.target.value)}
        placeholder="Enter value"
      />
      <DeleteButton handleDelete={handleDelete} />
    </ProjectInfoItem>
  );
};

const ProjectInfoItem = styled.div`
  display: flex;
  height: 40px;
`;

const NameInput = styled.input`
  width: 18vw;
  margin-right: 20px;
  margin-bottom: 8px;
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ValueInput = styled.input`
  width: 50vw;
  margin-bottom: 8px;
  padding: 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.color_Gray_05};
  outline: none;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;


export default ProjectInfoTemp;