import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SelectType, SortOrder, TextAlignment, DisplayAlignment, WorkDisplaySize, WorkType, CountryType } from '../enum/EnumRepository';


const selectOptions = {
  [SelectType.TEXT_ALIGNMENT]: Object.values(TextAlignment),
  [SelectType.DISPLAY_ALIGNMENT]: Object.values(DisplayAlignment),
  [SelectType.WORK_SIZE]: Object.values(WorkDisplaySize),
  [SelectType.SORT_ORDER]: Object.values(SortOrder),
  [SelectType.WORK_TYPE]: Object.values(WorkType),
  [SelectType.COUNTRY]: Object.values(CountryType),
};

type SelectValue = TextAlignment | DisplayAlignment | WorkDisplaySize | SortOrder | WorkType | CountryType;

interface SelectBoxProps<T extends SelectValue> {
  value: T;
  selectType: SelectType;
  handleChange: (value: T) => void;
  direction: boolean; //true: UP, false: DOWN
}


const SelectBox = <T extends SelectValue>({
  value,
  selectType,
  handleChange,
  direction,
}: SelectBoxProps<T>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const options = selectOptions[selectType];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectContainer ref={containerRef}>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        <span>{value}</span>
        <SelectDirection $isOpen={isOpen}>▼</SelectDirection>
      </SelectButton>
      {isOpen && (
        <OptionsContainer $direction={direction}>
          {options.map((option) => (
            <Option
              key={option}
              $isSelected={option === value}
              onClick={() => {
                handleChange(option as T);
                setIsOpen(false);
              }}
            >
              {option}
            </Option>
          ))}
        </OptionsContainer>
      )}
    </SelectContainer>
  );
};


const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 80px;
`;

const SelectButton = styled.div`
  width: 100%;
  padding: 2px;
  background-color: transparent;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.color_Gray_04};
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  &:focus {
    outline: none;
    }
`;

const SelectDirection = styled.span<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? "scaleY(-1) scale(0.7)" : "scaleY(1) scale(0.7)")};
  transition: transform 0.6s ease-in-out;
`;

const OptionsContainer = styled.div<{ $direction: boolean }>`
  position: absolute;
  ${({ $direction }) => ($direction ? "bottom: 100%;" : "top: 100%;")}
  left: 0;
  width: 100%;
  backdrop-filter: blur(4px);
  background-color: ${({ theme }) => theme.colors.color_Alpha_04};
  border-bottom: 0.8px solid ${({ theme }) => theme.colors.color_Gray_04};
  z-index: 3;
`;


const Option = styled.div<{ $isSelected: boolean }>`
  padding: 2px;
  cursor: pointer;
  background-color: ${({ $isSelected }) => $isSelected ? '#f5f5f5' : 'transparent'};
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default SelectBox;