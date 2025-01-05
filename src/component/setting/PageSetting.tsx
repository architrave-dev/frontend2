import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useSettingStoreForUpdate } from '../../shared/store/settingStore';
import { SubContainer, SubTitle, SubValue, SubWrapper, Title } from './MemberSetting';
import { useSetting } from '../../shared/hooks/useApi/useSetting';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { SettingInput } from '../../shared/component/headless/input/InputBody';
import { UpdateSettingReq } from '../../shared/dto/ReqDtoRepository';
import ToggleSwitch from '../../shared/component/ToggleSwtich';
import { MenuVisible } from '../../shared/dto/EntityRepository';
import MoleculeDivToggle from '../../shared/component/molecule/MoleculeDivToggle';

const PageSetting: React.FC = () => {
  const { setting } = useSetting();
  const { updateSettingDto, setUpdateSettingDto } = useSettingStoreForUpdate();

  const handleChange = (field: keyof UpdateSettingReq, value: string | boolean) => {
    // setUpdateSettingDto({ ...updateSettingDto, [field]: value });
  }
  const handleMenuVisibilityChange = (field: keyof MenuVisible, value: boolean) => {
    // setUpdateSettingDto({ ...updateSettingDto, [field]: value });
  }
  const handleToggleChange = (checked: boolean) => {
    console.log('현재 토글 상태:', checked ? 'ON' : 'OFF');
  };

  if (!setting || !updateSettingDto) return null;


  return (
    <PageSettingComp>
      <Title>Page</Title>
      <SubContainer>
        <SubWrapper>
          <SubTitle>Title Name
            <SubExplain>The value displayed in uppercase next to the Menu icon.</SubExplain>
          </SubTitle>
          <MoleculeInputDiv
            value={updateSettingDto.pageName}
            placeholder={"address"}
            handleChange={(e) => handleChange("pageName", e.target.value)}
            inputStyle={SettingInput}
            StyledDiv={SubValue}
          />
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Page Visibility
            <SubExplain>
              {updateSettingDto.pageVisible === true ?
                "Public means the visitor can access through an AUI search from the home" :
                "Private means the visitor can't access through an AUI search from the home"
              }
            </SubExplain>
          </SubTitle>
          <SubToggleValue>
            <SubSubValue $isVisible={updateSettingDto.pageVisible}>{updateSettingDto.pageVisible === true ? "Public" : "Private"}</SubSubValue>
            <ToggleWrapper>
              <ToggleSwitch onChange={handleToggleChange} defaultChecked={updateSettingDto.menuVisible.projects} />
            </ToggleWrapper>
          </SubToggleValue>
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Menu Visibility</SubTitle>
          <MoleculeDivToggle
            value={updateSettingDto.menuVisible.projects}
            name={"Projects"}
            handleToggle={handleToggleChange}
          />
          <MoleculeDivToggle
            value={updateSettingDto.menuVisible.works}
            name={"Works"}
            handleToggle={handleToggleChange}
          />
          <MoleculeDivToggle
            value={updateSettingDto.menuVisible.about}
            name={"About"}
            handleToggle={handleToggleChange}
          />
          <MoleculeDivToggle
            value={updateSettingDto.menuVisible.contact}
            name={"Contact"}
            handleToggle={handleToggleChange}
          />
        </SubWrapper>
      </SubContainer>
    </PageSettingComp>
  );
}

const PageSettingComp = styled.section`
  width: 55%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const ToggleWrapper = styled.div`
  width: 36px;
`

const SubExplain = styled.div`
  width: fit-content;
  // margin-left: 14px;
  padding-top: 4px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`

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

  color: ${({ theme, $isVisible }) => $isVisible ? theme.colors.color_Gray_01 : theme.colors.color_Gray_03};
`;

export default PageSetting;