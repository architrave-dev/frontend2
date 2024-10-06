import React from 'react';
import styled from 'styled-components';
import SelectBox, { SelectType, SortOrder } from '../../shared/component/SelectBox';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { WorkData } from '../../shared/store/WorkListStore';
import { getAreaFromSize } from '../../shared/store/projectElementStore';


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

interface SortStationProps {
  setSortOrder: (value: SortOrder) => void;
}

const SortStation: React.FC<SortStationProps> = (
  { setSortOrder }
) => {
  const { isEditMode } = useEditMode();

  const handleOrderChange = (value: SortOrder) => {
    if (isEditMode) {
      alert("Exit edit mode.");
      return;
    }
    console.log("We should order work list by ", value);
    setSortOrder(value);
  };


  return (
    <SortingStation>
      <div>Sort by:
        <SelectBox
          value={SortOrder.TITLE_ASC}
          selectType={SelectType.SORT_ORDER}
          handleChange={handleOrderChange} />
      </div>
    </SortingStation>
  );
}

const SortingStation = styled.article`
  width: 100%;
  height: 100px;

  display: flex;
`;

export default SortStation;