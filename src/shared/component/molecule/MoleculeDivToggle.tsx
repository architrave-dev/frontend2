import React from 'react';
import { styled } from 'styled-components';
import ToggleSwitch from '../ToggleSwtich';

interface MoleculeDivToggleProps {
  value: boolean;
  name: string;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MoleculeDivToggle: React.FC<MoleculeDivToggleProps> = ({
  value,
  name,
  handleToggle,
}) => {

  return (
    <SubToggleValue>
      <SubSubValue $isVisible={value}>{name}</SubSubValue>
      <ToggleWrapper>
        <ToggleSwitch onChange={handleToggle} defaultChecked={value} />
      </ToggleWrapper>
    </SubToggleValue>
  );
};


export default MoleculeDivToggle;

const SubToggleValue = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.typography.Body_03_2};
`;
const SubSubValue = styled.div<{ $isVisible: boolean }>`
  width: fit-content;
  padding: 6px 0px;
  ${({ theme }) => theme.typography.Body_03_2};

  color: ${({ theme, $isVisible }) => $isVisible ? theme.colors.color_Gray_01 : theme.colors.color_Gray_05};
`;
const ToggleWrapper = styled.div`
  width: 36px;
`