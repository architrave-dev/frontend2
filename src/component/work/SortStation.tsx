import React from 'react';
import styled from 'styled-components';
import SelectBox from '../../shared/component/SelectBox';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType, SelectType, SortDirection, SortOrder } from '../../shared/enum/EnumRepository';
import { useWorkListStore } from '../../shared/store/WorkListStore';


const SortStation: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { setStandardAlert } = useStandardAlertStore();
  const { sortData, setSortData } = useWorkListStore();

  const handleOrderChange = (value: SortOrder) => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Exit edit mode."
      })
      return;
    }
    setSortData({ ...sortData, sort: value });
  };

  const handleDirectionChange = (value: SortDirection) => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Exit edit mode."
      })
      return;
    }
    setSortData({ ...sortData, direction: value });
  };

  return (
    <SortingStation>
      <SortCaption>
        Sort:
      </SortCaption>
      <SelectBoxWrapper>
        <SelectBox
          value={sortData.sort}
          selectType={SelectType.SORT_ORDER}
          handleChange={handleOrderChange}
          direction={false} />
      </SelectBoxWrapper>
      <SelectBoxWrapper>
        <SelectBox
          value={sortData.direction}
          selectType={SelectType.SORT_DIRECTION}
          handleChange={handleDirectionChange}
          direction={false} />
      </SelectBoxWrapper>
    </SortingStation>
  );
}

const SortingStation = styled.article`
  width: 100%;
  height: fit-content;

  display: flex;
  justify-content: flex-end;

  gap: 10px;
`;

const SortCaption = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`;

const SelectBoxWrapper = styled.article`
  width: 8vw;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`;

export default SortStation;