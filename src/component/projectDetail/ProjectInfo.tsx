import React from 'react';
import styled from 'styled-components';
import { useProjectInfoListStore } from '../../shared/store/projectInfoStore';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { InputName, InputValue } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnModalMain, BtnModalSub } from '../../shared/component/headless/button/BtnBody';
import { ProjectInfoData } from '../../shared/dto/EntityRepository';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { useProjectInfo } from '../../shared/hooks/useApi/useProjectInfo';
import { useAui } from '../../shared/hooks/useAui';

interface ProjectInfoProps {
  data: ProjectInfoData;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ data }) => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { updateProjectInfo: handleChange, afterDeleteProjectInfo } = useProjectInfoListStore();
  const { updateProjectInfo, deleteProjectInfo } = useProjectInfo();

  const handleUpdate = async () => {
    await updateProjectInfo(aui, data);
  };

  const handleDelete = async () => {
    try {
      await deleteProjectInfo(aui, { id: data.id });
      afterDeleteProjectInfo(data.id);
    } catch (err) {
    }
  }

  return (
    <ProjectInfoItem $isEditMode={isEditMode}>
      <MoleculeInputDiv
        value={data.customName}
        placeholder={"name"}
        handleChange={(e) => handleChange(data.id, { customName: e.target.value })}
        inputStyle={InputName}
        StyledDiv={NameSection}
      />
      <MoleculeInputDiv
        value={data.customValue}
        placeholder={"value"}
        handleChange={(e) => handleChange(data.id, { customValue: e.target.value })}
        inputStyle={InputValue}
        StyledDiv={ValueSection}
      />
      {isEditMode &&
        <BtnContainer>
          {data.hasChanged &&
            <HeadlessBtn
              value={"Update"}
              handleClick={handleUpdate}
              StyledBtn={BtnModalMain}
            />
          }
          <HeadlessBtn
            value={"Delete"}
            handleClick={handleDelete}
            StyledBtn={BtnModalSub}
          />
        </BtnContainer>
      }
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

const BtnContainer = styled.div`
  position: absolute;
  right: 0px;
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5vw;

  padding: 4px 0px;
`

export default React.memo(ProjectInfo);
