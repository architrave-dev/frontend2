import React from 'react';
import styled from 'styled-components';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useAui } from '../shared/hooks/useAui';
import { useEditMode } from '../shared/hooks/useEditMode';
import { useContact } from '../shared/hooks/useApi/useContact';
import { UpdateContactReq } from '../shared/dto/ReqDtoRepository';
import ContactComp from '../component/contact/Contact';
import { BtnConfirm } from '../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';
import { useContactStore } from '../shared/store/contactStore';


const Contact: React.FC = () => {
  useInitPage();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { contact, updateContact } = useContact();
  const { hasChanged } = useContactStore();
  const { isLoading } = useLoadingStore();


  const handleConfirm = async () => {
    try {
      if (hasChanged) {
        if (!contact) return;
        const haha: UpdateContactReq = {
          ...contact,
          ...contact.sns
        }

        await updateContact(aui, haha);
      }
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  return (
    <ContactContainer>
      <Loading isLoading={isLoading} />
      <ContactComp />
      {isEditMode && hasChanged &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
    </ContactContainer>
  );
}

export default Contact;


const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: calc(8vh) calc(6vw);

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;