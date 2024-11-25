import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { WorkType } from '../../shared/enum/EnumRepository';
import { WorkPropertyVisibleData } from '../../shared/dto/EntityRepository';
import { useWorkPropertyVisible } from '../../shared/hooks/useApi/useWorkPropertyVisible';

interface BlockWithVisibleProps {
  width: string;
  isColumn?: boolean;
  field?: keyof WorkPropertyVisibleData;
  value: string | WorkType;
  doubleClickHandler?: () => void;
}

const BlockWithVisible: React.FC<BlockWithVisibleProps> = ({ width, isColumn, field, value, doubleClickHandler }) => {
  const { isEditMode } = useEditMode();
  const { workPropertyVisible } = useWorkPropertyVisible();

  if (!workPropertyVisible) return null;

  const renderCondition = () => {
    if (!field) {
      return true;
    }
    if (!isEditMode && !workPropertyVisible[field]) // edit 모드가 아닌데 visible이 false면 안보여야해
      return false;
    else
      return true;
  }

  const opacityCondition = () => {
    if (!field) {
      return true;
    }
    return workPropertyVisible[field] as boolean;
  }

  return (
    <>
      {renderCondition() &&
        <Block $width={width}
          $isColumn={isColumn}
          onDoubleClick={doubleClickHandler}>
          <Value
            $isColumn={isColumn}
            $isVisible={opacityCondition()}
          >
            {value}
          </Value>
        </Block>
      }
    </>
  )
}


const Block = styled.div<{ $width: string; $isColumn: boolean | undefined }>`
  flex: ${({ $width }) => $width};

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 0;

  border-bottom: ${({ $isColumn, theme }) =>
    $isColumn ? 'none' : `0.5px solid ${theme.colors.color_Gray_04}`};
`

const Value = styled.span<{ $isVisible: boolean; $isColumn: boolean | undefined }>`
  width: 80%;

  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  padding-left: ${({ $isColumn }) => $isColumn ? `0px` : '3px'};

  text-align: center;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.5)};
`

export default BlockWithVisible;