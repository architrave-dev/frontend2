import React from 'react';
import styled from 'styled-components';
import { DividerType } from './enum/EnumRepository';


export interface DividerProps {
  dividerType: DividerType;
  bottom?: string;
}

const Divider: React.FC<DividerProps> = ({ dividerType, bottom }) => {
  return (
    <DividerComp $dividerType={dividerType} $bottom={bottom} />
  );
}

const DividerComp = styled.hr<{ $dividerType: DividerType, $bottom?: string }>`
  display: block;
  border-top: 1px;
  transform: scaleY(0.3);
  border-color: ${({ theme }) => theme.colors.color_Gray_05};
  margin-bottom: ${({ $bottom }) => $bottom ? $bottom : '40px'};
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


export default Divider;