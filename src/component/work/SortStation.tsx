import React from 'react';
import styled from 'styled-components';
import SelectBox from '../../shared/component/SelectBox';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType, SelectType, SortOrder } from '../../shared/enum/EnumRepository';
import { WorkData, getAreaFromSize } from '../../shared/dto/EntityRepository';
import { useWorkListStore } from '../../shared/store/WorkListStore';


const compareValues = <T extends keyof WorkData>(a: WorkData[T], b: WorkData[T]): number => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const sortWorkList = (workList: WorkData[], sortOrder: SortOrder): WorkData[] => {
  return workList.sort((a, b) => {
    switch (sortOrder) {
      case SortOrder.TITLE_ASC:
        return compareValues(a.title, b.title);
      case SortOrder.TITLE_DESC:
        return compareValues(b.title, a.title);
      case SortOrder.SIZE_ASC:
        return getAreaFromSize(a.size) - getAreaFromSize(b.size);
      case SortOrder.SIZE_DESC:
        return getAreaFromSize(b.size) - getAreaFromSize(a.size);
      case SortOrder.YEAR_ASC:
        return compareValues(a.prodYear, b.prodYear);
      case SortOrder.YEAR_DESC:
        return compareValues(b.prodYear, a.prodYear);
      default:
        return 0;
    }
  });
}

const SortStation: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { setStandardAlert } = useStandardAlertStore();
  const { setSortBy } = useWorkListStore();

  const handleOrderChange = (value: SortOrder) => {
    if (isEditMode) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Exit edit mode."
      })
      return;
    }
    console.log("We should order work list by ", value);
    setSortBy(value);
  };


  return (
    <SortingStation>
      <span>
        Sort by:
      </span>
      <SelectBox
        value={SortOrder.TITLE_ASC}
        selectType={SelectType.SORT_ORDER}
        handleChange={handleOrderChange} />
    </SortingStation>
  );
}

const SortingStation = styled.article`
  width: 100%;
  height: 40px;

  display: flex;
  padding: 10px 0px;

  gap: 10px;
`;

export default SortStation;