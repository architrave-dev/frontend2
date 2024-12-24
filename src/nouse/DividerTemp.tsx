import React from 'react';
import styled from 'styled-components';
import { DividerType } from '../shared/enum/EnumRepository';

interface DividerProps {
  tempId: string;
  dividerType: DividerType;
}

const DividerTemp: React.FC<DividerProps> = ({ tempId, dividerType }) => {
  return (
    <DividerComp $dividerType={dividerType} />
  );
}

const DividerComp = styled.hr<{ $dividerType: DividerType }>`
  display: block;
  border-top: 1px;
  transform: scaleY(0.3);
  border-color: ${({ theme }) => theme.colors.color_Gray_05};
  margin-bottom: 40px;
  border-style: ${({ $dividerType }) => {
    switch ($dividerType) {
      case DividerType.DOTTED:
        return 'dotted';
      case DividerType.DASHED:
        return 'dashed';
      case DividerType.PLAIN:
      default:
        return 'solid';
    }
  }};
`;


export default DividerTemp;