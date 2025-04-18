import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useContact } from '../../shared/hooks/useApi/useContact';
import { ContactInput } from '../../shared/component/headless/input/InputBody';
import { useContactStore } from '../../shared/store/contactStore';
import { AlertPosition, AlertType, ModalType } from '../../shared/enum/EnumRepository';
import { useMenu } from '../../shared/hooks/useMenu';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import OrgInputDivVisiAction from '../../shared/component/organism/OrgInputDivVisiAction';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useContactPropertyVisible } from '../../shared/hooks/useApi/useContactPropertyVisible';
import { ContactPropertyVisibleData } from '../../shared/dto/EntityRepository';
import OrgInputAnchorVisi from '../../shared/component/organism/OrgInputAnchorVisi';
import OrgInputDivVisi from '../../shared/component/organism/OrgInputDivVisi';


const ContactComp: React.FC = () => {
  const { aui } = useAui();
  const { user } = useAuth();
  const { isEditMode } = useEditMode();
  const { contact, getContact } = useContact();
  const { closeMenu } = useMenu();
  const { setStandardModal } = useModalStore();
  const { setStandardAlert } = useStandardAlertStore();
  const { updateContact: handleChange, updateSns: handleSnsChange } = useContactStore();
  const { contactPropertyVisible, getContactPropertyVisible, updateContactPropertyVisible } = useContactPropertyVisible();

  useEffect(() => {
    const getContactWithApi = async () => {
      if (!aui) return;
      console.log("getting contact List...")
      await getContact(aui);
    }
    getContactWithApi();
  }, [aui]);

  useEffect(() => {
    const getContactPropertyVisibleWithApi = async () => {
      if (!aui) return;
      console.log("getting contactPropertyVisible...");
      await getContactPropertyVisible(aui);
    }
    getContactPropertyVisibleWithApi();
  }, [aui]);


  if (!contact || !contactPropertyVisible) {
    return null;
  }

  const handleSendEmail = () => {
    if (!user) {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "Please login to send an email.",
      });
      return;
    }

    if (!contact || contact.email === '') {
      setStandardAlert({
        type: AlertType.ALERT,
        position: AlertPosition.TOP,
        content: "There is no email address.",
      });
      return;
    }
    setStandardModal({
      modalType: ModalType.EMAIL_SEND,
      title: null,
      value: null,
      handleChange: () => { }
    });
    closeMenu();
  }

  const handleDoubleClick = async (field: keyof ContactPropertyVisibleData) => {
    if (!isEditMode) return null;
    await updateContactPropertyVisible(aui, {
      contactPropertyVisibleId: contactPropertyVisible.id,
      ...contactPropertyVisible,
      [field]: !contactPropertyVisible[field]
    });
  };

  return (
    <ContactContainer>
      <ContactTitle>Contact</ContactTitle>
      <Contact1Container>
        <Contact_1>
          <OrgInputDivVisi
            value={contact.address}
            defaultValue={"00-0, example-ro 0-gil, Sample-gu, Seoul, Republic of Korea"}
            placeholder={"Enter your address"}
            handleChange={(e) => handleChange({ address: e.target.value })}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
            visible={contactPropertyVisible.address}
            changeVisible={() => handleDoubleClick('address')}
          />
        </Contact_1>
        <Contact_1>
          <OrgInputDivVisiAction
            value={contact.email}
            defaultValue={"username@email.com"}
            placeholder={"email"}
            handleChange={(e) => handleChange({ email: e.target.value })}
            onClick={handleSendEmail}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
            visible={contactPropertyVisible.email}
            changeVisible={() => handleDoubleClick('email')}
          />
          <OrgInputDivVisi
            value={contact.contact}
            defaultValue={"010-1234-5678"}
            placeholder={"Enter your contact"}
            handleChange={(e) => handleChange({ contact: e.target.value })}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
            visible={contactPropertyVisible.contact}
            changeVisible={() => handleDoubleClick('contact')}
          />
        </Contact_1>
        <Contact_1>
          <OrgInputAnchorVisi
            value={contact.sns?.instagram}
            defaultValue={"Enter Instagram ID"}
            placeholder={"Instagram"}
            handleChange={(e) => handleSnsChange({ instagram: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
            visible={contactPropertyVisible.instagram}
            changeVisible={() => handleDoubleClick('instagram')}
          />
          <OrgInputAnchorVisi
            value={contact.sns?.twitter}
            defaultValue={"Enter X ID"}
            placeholder={"X"}
            handleChange={(e) => handleSnsChange({ twitter: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
            visible={contactPropertyVisible.twitter}
            changeVisible={() => handleDoubleClick('twitter')}
          />
          <OrgInputAnchorVisi
            value={contact.sns?.facebook}
            defaultValue={"Enter facebook ID"}
            placeholder={"Facebook"}
            handleChange={(e) => handleSnsChange({ facebook: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
            visible={contactPropertyVisible.facebook}
            changeVisible={() => handleDoubleClick('facebook')}
          />
          <OrgInputAnchorVisi
            value={contact.sns?.url1}
            defaultValue={"Enter website URL"}
            placeholder={"URL"}
            handleChange={(e) => handleSnsChange({ url1: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
            visible={contactPropertyVisible.url1}
            changeVisible={() => handleDoubleClick('url1')}
          />
        </Contact_1>
      </Contact1Container>

      {isEditMode && (
        <SettingNotice>
          * If you prefer not to use this page, go to Settings &gt; Menu Visibility.
        </SettingNotice>
      )}
    </ContactContainer >
  );
};


const ContactContainer = styled.section`
  width: clamp(300px, 50%, 500px);
  display: flex;
  flex-direction: column;

  margin-top: 50px;
`;

const Contact1Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Contact_1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContactTitle = styled.div`
  width: fit-content;
  border-bottom: 1.6px solid ${({ theme }) => theme.colors.color_Gray_02};

  padding: 12px 0px;
  padding-right: 5px;
  margin-bottom: 14px;
  ${({ theme }) => theme.typography.Body_01_1};
`;

const ContactDiv = styled.div`
  width: 100%;
  height: 20px;

  display: flex;
  align-items: center;
  gap: 10px;

  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_02_2};
`

const ContactAnchor = styled.a`
  width: fit-content;
  min-width: 100px;
  height: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  text-decoration: underline;

  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_02_2};
  background-color: skyblue;
  cursor: pointer;
`

const SettingNotice = styled.div`
  width: 100%;
  height: 3vh;
  display: flex;

  align-items: end;
  color: ${({ theme }) => theme.colors.color_Gray_05};
  ${({ theme }) => theme.typography.Body_04};
`;

export default ContactComp;
