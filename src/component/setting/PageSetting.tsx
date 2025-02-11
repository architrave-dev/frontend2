import React from 'react';
import styled from 'styled-components';
import { SubContainer, SubTitle, SubValue, SubValueBtn, SubValueChange, SubWrapper, Title } from './MemberSetting';
import { useSetting } from '../../shared/hooks/useApi/useSetting';
import { UpdateSettingReq } from '../../shared/dto/ReqDtoRepository';
import { MenuVisible } from '../../shared/dto/EntityRepository';
import MoleculeDivToggle from '../../shared/component/molecule/MoleculeDivToggle';
import { useAui } from '../../shared/hooks/useAui';
import MoleculeDivBtn from '../../shared/component/molecule/MoleculeDivBtn';
import { ModalType } from '../../shared/enum/EnumRepository';
import { useModalStore } from '../../shared/store/portal/modalStore';


const PageSetting: React.FC = () => {
  const { aui } = useAui();
  const { setting, updateSetting } = useSetting();
  const { setStandardModal } = useModalStore();

  if (!setting) return null;

  const handleChangeTitleName = () => {
    setStandardModal({
      modalType: ModalType.CHANGE_STATION,
      title: "Title Name",
      value: setting.pageName,
      handleChange: (value: string) => handlePageChange('pageName', value)
    });
  }

  const handlePageChange = async (field: keyof UpdateSettingReq, value: string | boolean) => {
    await updateSetting(aui, {
      ...setting,
      [field]: value
    });
  }

  const handleMenuVisibilityChange = async (field: keyof MenuVisible, value: boolean) => {
    await updateSetting(aui, {
      ...setting,
      menuVisible: {
        ...setting.menuVisible,
        [field]: value
      }
    });
  };

  return (
    <PageSettingComp>
      <Title>Page</Title>
      <SubContainer>
        <SubWrapper>
          <SubTitle>Title Name
            <SubExplain>The value displayed in uppercase next to the Menu icon.</SubExplain>
          </SubTitle>
          <MoleculeDivBtn
            value={setting.pageName}
            defaultValue={"Title Name"}
            handleClick={handleChangeTitleName}
            DivChangeStyle={SubValueChange}
            DivStyle={SubValue}
            StyledBtn={SubValueBtn}
          />
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Page Visibility
            <SubExplain>
              {setting.pageVisible === true ?
                "Public means the visitor can access through an AUI search from the home" :
                "Private means the visitor can't access through an AUI search from the home"
              }
            </SubExplain>
          </SubTitle>
          <MoleculeDivToggle
            value={setting.pageVisible}
            name={setting.pageVisible === true ? "Public" : "Private"}
            handleToggle={(e) => handlePageChange("pageVisible", e.target.checked)}
          />
        </SubWrapper>
        <SubWrapper>
          <SubTitle>Menu Visibility</SubTitle>
          <MoleculeDivToggle
            value={setting.menuVisible.projects}
            name={"Projects"}
            handleToggle={(e) => handleMenuVisibilityChange("projects", e.target.checked)}
          />
          <MoleculeDivToggle
            value={setting.menuVisible.works}
            name={"Works"}
            handleToggle={(e) => handleMenuVisibilityChange("works", e.target.checked)}
          />
          <MoleculeDivToggle
            value={setting.menuVisible.about}
            name={"About"}
            handleToggle={(e) => handleMenuVisibilityChange("about", e.target.checked)}
          />
          <MoleculeDivToggle
            value={setting.menuVisible.contact}
            name={"Contact"}
            handleToggle={(e) => handleMenuVisibilityChange("contact", e.target.checked)}
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

const SubExplain = styled.div`
  width: fit-content;
  // margin-left: 14px;
  padding-top: 4px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`

export default PageSetting;