import React from 'react';
import styled from 'styled-components';

export enum EnumType {
  PLAIN = 'Plain',
  DOTTED = 'Dotted',
  DASHED = 'Dashed',
}

interface DividerProps {
  dividerType: EnumType;
}

const Divider: React.FC<DividerProps> = ({ dividerType }) => {
  return (
    <DividerComp dividerType={dividerType} />
  );
}

const DividerComp = styled.hr<{ dividerType: EnumType }>`
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors.color_Alpha_02};
  margin-bottom: 40px;
  border-style: ${({ dividerType }) => {
    switch (dividerType) {
      case EnumType.DOTTED:
        return 'dotted';
      case EnumType.DASHED:
        return 'dashed';
      case EnumType.PLAIN:
      default:
        return 'solid';
    }
  }};
`;


export default Divider;