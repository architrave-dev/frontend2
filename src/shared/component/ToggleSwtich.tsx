import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../hooks/useEditMode';

interface ToggleSwitchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  onChange,
  defaultChecked = false,
}) => {
  const { isEditMode } = useEditMode();
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  if (!isEditMode) return null;
  return (
    <ToggleContainer>
      <HiddenCheckbox checked={checked} onChange={handleChange} />
      <Slider checked={checked} />
    </ToggleContainer>
  );
};

export default ToggleSwitch;


const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 100%;
  aspect-ratio: 50 / 28;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Slider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  background-color: ${({ checked }) => (checked ? '#2196F3' : '#ccc')};
  transition: 0.4s;

  border-radius: 9999px;

  /* 동그라미(핸들) 부분 */
  &::before {
    position: absolute;
    content: "";
    
    height: 76%;
    width: auto;
    aspect-ratio: 1 / 1;

    left: 10%;
    bottom: 14%;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.4s;

    transform: ${({ checked }) => (checked ? 'translateX(100%)' : 'none')};
  }
`;