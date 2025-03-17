import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useWorkViewStore } from '../../shared/store/WorkViewStore';
import { WorkData } from '../../shared/dto/EntityRepository';
import { useWorkPropertyVisible } from '../../shared/hooks/useApi/useWorkPropertyVisible';

interface DividerVerticalProps {
  left: keyof WorkData;
  right: keyof WorkData;
}

const DividerVertical: React.FC<DividerVerticalProps> = ({
  left,
  right
}) => {
  const { isEditMode } = useEditMode();
  const { activeWork } = useWorkViewStore();
  const { workPropertyVisible } = useWorkPropertyVisible();
  if (!activeWork || !workPropertyVisible) return null;


  const renderCondition = () => {
    //editmode == true면 무조건 보여줘
    if (isEditMode) {
      return true;
    }

    // 전부 값이 있어야하고
    if (!!(activeWork[left] && activeWork[right])) {
      //visibility 설정이 가능한 친구들일 경우,
      if (left === "price" && right === "collection") {
        //전부 다 true여야 해.
        if (workPropertyVisible[left] && workPropertyVisible[right]) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }


  return (
    renderCondition() ?
      <DividerVerticalComp>|</DividerVerticalComp>
      :
      null
  );
}


const DividerVerticalComp = styled.span`
  height: 18px;
  padding-right:4px;
  color: ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_04};
`;


export default DividerVertical;  