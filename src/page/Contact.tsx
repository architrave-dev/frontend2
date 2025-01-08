import React from 'react';
import styled from 'styled-components';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useAui } from '../shared/hooks/useAui';
import { useEditMode } from '../shared/hooks/useEditMode';
import { useContact } from '../shared/hooks/useApi/useContact';
import { useContactStoreForUpdate } from '../shared/store/contactStore';
import { isModified } from '../shared/hooks/useIsModified';
import { UpdateContactReq } from '../shared/dto/ReqDtoRepository';
import ContactComp from '../component/contact/Contact';
import { BtnConfirm } from '../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';


const Contact: React.FC = () => {
  useInitPage();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { contact, updateContact } = useContact();
  const { updateContactDto } = useContactStoreForUpdate()
  const { isLoading } = useLoadingStore();

  const contactCheck = (): boolean => {
    if (!contact || !updateContactDto) {
      return false;
    }
    return isModified(contact, updateContactDto);
  }


  const handleConfirm = async () => {
    try {
      if (contactCheck()) {
        if (!updateContactDto) return;
        const haha: UpdateContactReq = {
          ...updateContactDto,
          twitter: updateContactDto.sns.twitter,
          instagram: updateContactDto.sns.instagram,
          facebook: updateContactDto.sns.facebook,
          threads: updateContactDto.sns.threads,
          behance: updateContactDto.sns.behance,
          youtube: updateContactDto.sns.youtube,
          vimeo: updateContactDto.sns.vimeo,
          url1: updateContactDto.sns.url1,
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
      {isEditMode && contactCheck() &&
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