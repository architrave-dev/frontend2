import React from 'react';
import styled from 'styled-components';

export enum TextBoxType {
  LEFT = 'Left',
  CENTER = 'Center',
  RIGHT = 'Right',
}

export interface TextBoxProps {
  texBoxType: TextBoxType;
  content: string;
}

const TextBox: React.FC<TextBoxProps> = ({ texBoxType, content }) => {

  return (
    <TextBoxWrapper>
      <TextBoxContent align={texBoxType}>{content}</TextBoxContent>
    </TextBoxWrapper>
  );
}

const TextBoxWrapper = styled.div`
`;

const TextBoxContent = styled.p<{ align: TextBoxType }>`
  text-align: ${({ align }) => {
    switch (align) {
      case TextBoxType.LEFT:
        return 'left';
      case TextBoxType.CENTER:
        return 'center';
      case TextBoxType.RIGHT:
        return 'right';
      default:
        return 'center';
    }
  }};
  color: ${({ theme }) => theme.colors.color_Gray_03};
  font-size: ${({ theme }) => theme.fontSize.font_B03};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;


export default TextBox;