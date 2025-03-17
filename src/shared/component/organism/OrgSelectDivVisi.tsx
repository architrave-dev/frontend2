import React from 'react';
import { useEditMode } from '../../hooks/useEditMode';
import { SelectType, WorkType } from '../../enum/EnumRepository';
import { StyledDivComponent } from '../../dto/StyleCompRepository';
import { SelectBoxWrapper } from '../../../component/projectElement/Work';
import SelectBox from '../SelectBox';
import { VisibileGrab } from './OrgDescription';
import { OrgWrapper } from './OrgDescription';


interface OrgDescriptionProps {
  value: WorkType;
  selectType: SelectType;
  handleChange: (value: WorkType) => void;
  StyledDiv: StyledDivComponent;
  visible: boolean;
  changeVisible: () => void;
}

const OrgSelectDivVisi: React.FC<OrgDescriptionProps> = ({
  value,
  selectType,
  handleChange,
  StyledDiv,
  visible,
  changeVisible,
}) => {
  const { isEditMode } = useEditMode();

  return (
    <>
      {isEditMode ?
        <OrgWrapper $isVisible={visible}>
          <SelectBoxWrapper>
            <SelectBox
              value={value}
              selectType={selectType}
              handleChange={handleChange}
              direction={false} />
          </SelectBoxWrapper>
          <VisibileGrab
            onDoubleClick={changeVisible}
          >.:</VisibileGrab >
        </OrgWrapper>
        : (
          visible ?
            <StyledDiv>{value}</StyledDiv>
            :
            null
        )
      }
    </>
  );
};


export default OrgSelectDivVisi;
