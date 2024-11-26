import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkViewStore, useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import WorkDetail from './WorkDetail';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnWorkViewer } from '../../shared/component/headless/button/BtnBody';
import { useWorkDetail } from '../../shared/hooks/useApi/useWorkDetail';
import { WorkType } from '../../shared/enum/EnumRepository';



const WorkDetailList: React.FC = () => {
  const { aui } = useAui();
  const { isEditMode } = useEditMode();
  const { createWorkDetail } = useWorkDetail();
  const { activeWork } = useWorkViewStore();
  const { updateActiveWorkDetailList } = useWorkViewStoreForUpdate();

  if (activeWork === null) {
    return null;
  }

  const handleAddWorkDetail = async () => {
    const createDetail = async () => {
      try {
        await createWorkDetail(aui, {
          workId: activeWork.id,
          workType: WorkType.NONE,
          originUrl: "",
          thumbnailUrl: "",
          description: "",
        });
      } catch (err) {
      } finally {
      }
    }
    createDetail();
  };

  return (
    <>
      {updateActiveWorkDetailList.length > 0 &&
        <>
          <WorkDetailTitle>Details</WorkDetailTitle>
          <WorkDetailContainer>
            {updateActiveWorkDetailList.map((wd, index) => (
              <WorkDetail key={wd.id} index={index + 1} workId={activeWork.id} data={wd} />
            ))}
          </WorkDetailContainer>
        </>
      }
      {isEditMode &&
        <HeadlessBtn
          value={"Add Detail"}
          handleClick={handleAddWorkDetail}
          StyledBtn={BtnWorkViewer}
        />
      }
    </>
  );
}

const WorkDetailTitle = styled.h3`
  width: 100%;
  height:28px;

  display: flex;
  align-items: center;

  padding-bottom: 1px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_1};
`;

const WorkDetailContainer = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  // background-color: #eae7dc;
`;


export default WorkDetailList;