import React from 'react';
import styled from 'styled-components';
import { CountryType, SelectType } from '../../shared/enum/EnumRepository';
import SelectBox from '../../shared/component/SelectBox';
import { useEditMode } from '../../shared/hooks/useEditMode';


export interface MemberInfoSelectProps {
  name: string;
  value: CountryType;
  handleChange: (value: CountryType) => void;
}

const MemberInfoSelect: React.FC<MemberInfoSelectProps> = ({
  name, value, handleChange
}) => {
  const { isEditMode } = useEditMode();

  return (
    <Info>
      <NameSection>{name}</NameSection>
      {isEditMode ? (
        <SelectBoxWrapper>
          <SelectBox
            value={value}
            selectType={SelectType.COUNTRY}
            handleChange={handleChange}
            direction={false} />
        </SelectBoxWrapper>
      ) : (
        <ValueSection>{value}</ValueSection>
      )}
    </Info>
  );
};

const Info = styled.div`
  display: flex;
`;

const NameSection = styled.div`
  width: 120px;
  padding: 5px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_2};
`;

const SelectBoxWrapper = styled.article`
  width: 100%;
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_02_1};
`;


const ValueSection = styled.div`
  width: 100%;
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  ${({ theme }) => theme.typography.Body_02_1};
`;


export default MemberInfoSelect;
