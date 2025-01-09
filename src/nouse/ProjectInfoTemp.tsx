import React from 'react';
import styled from 'styled-components';
import { InputNameNew, InputValueNew } from '../shared/component/headless/input/InputBody';
import HeadlessInput from '../shared/component/headless/input/HeadlessInput';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';
import { BtnDelete } from '../shared/component/headless/button/BtnBody';
import { CreateProjectInfoReq } from '../shared/dto/ReqDtoRepository';

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


  // const handleChange = (field: keyof CreateProjectInfoReq, value: string) => {
  //   const newCreatePiList: CreateProjectInfoReq[] = createPiList.map(each =>
  //     each.tempId === tempId ? { ...each, [field]: value } : each
  //   )
  //   setCreatePiList(newCreatePiList);
  // }

  // const handleDelete = () => {
  //   const filteredList = createPiList.filter((each) => each.tempId !== tempId);
  //   setCreatePiList(filteredList);
  // };

  return (
    <ProjectInfoItem>
      {/* <HeadlessInput
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
      /> */}
    </ProjectInfoItem>
  );
};

const ProjectInfoItem = styled.div`
  position: relative;
  display: flex;
  height: 40px;
  gap: 40px;
  margin-bottom: 10px;
`;


export default ProjectInfoTemp;