import React from 'react';
import styled from 'styled-components';


export enum SelectType {
  TEXTBOX_ALIGNMENT = 'TEXTBOX_ALIGNMENT',
  WORK_ALIGNMENT = 'WORK_ALIGNMENT',
  WORK_SIZE = 'WORK_SIZE',
}

export enum TextBoxAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}

export enum WorkAlignment {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT',
}
export enum WorkSize {
  BIG = 'BIG',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

const selectOptions = {
  [SelectType.TEXTBOX_ALIGNMENT]: Object.values(TextBoxAlignment),
  [SelectType.WORK_ALIGNMENT]: Object.values(WorkAlignment),
  [SelectType.WORK_SIZE]: Object.values(WorkSize),
};

type SelectValue = TextBoxAlignment | WorkAlignment | WorkSize;

interface SelectBoxProps<T extends SelectValue> {
  value: T;
  selectType: SelectType;
  handleChange: (value: T) => void;
}

const SelectBox = <T extends SelectValue>({
  value,
  selectType,
  handleChange
}: SelectBoxProps<T>): React.ReactElement => {
  const options = selectOptions[selectType];

  return (
    <Select
      value={value}
      onChange={(e) => {
        const newValue = e.target.value as T;
        handleChange(newValue);
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  width: 100px;
  padding: 2px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.color_Gray_04};
  border-radius: 1px;
  ${({ theme }) => theme.typography.Body_04};

  &:focus {
    outline: none;
  }
`;



export default SelectBox;