import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useContact } from '../../shared/hooks/useApi/useContact';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { ContactInput } from '../../shared/component/headless/input/InputBody';
import MoleculeInputAnchor from '../../shared/component/molecule/MoleculeInputAnchor';
import { useContactStore } from '../../shared/store/contactStore';


const ContactComp: React.FC = () => {
  const { aui } = useAui();
  const { contact, getContact } = useContact();
  const { updateContact: handleChange, updateSns: handleSnsChange } = useContactStore();


  useEffect(() => {
    const getContactWithApi = async () => {
      if (!aui) return;
      console.log("getting work List...")
      await getContact(aui);
    }
    getContactWithApi();
  }, [aui]);

  if (!contact) {
    return null;
  }


  return (
    <ContactContainer>
      <ContactTitle>Contact</ContactTitle>
      <Contact1Container>
        <Contact_1>
          <MoleculeInputDiv
            value={contact.address}
            placeholder={"address"}
            handleChange={(e) => handleChange({ address: e.target.value })}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
        </Contact_1>
        <Contact_1>
          <MoleculeInputDiv
            value={contact.email}
            placeholder={"email"}
            handleChange={(e) => handleChange({ email: e.target.value })}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
          <MoleculeInputDiv
            value={contact.contact}
            placeholder={"contact"}
            handleChange={(e) => handleChange({ contact: e.target.value })}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
        </Contact_1>
        <Contact_1>
          <MoleculeInputAnchor
            value={contact.sns.instagram}
            defaultValue={"Instagram"}
            placeholder={"Instagram"}
            handleChange={(e) => handleSnsChange({ instagram: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
          />
          <MoleculeInputAnchor
            value={contact.sns.twitter}
            defaultValue={"X"}
            placeholder={"X"}
            handleChange={(e) => handleSnsChange({ twitter: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
          />
          <MoleculeInputAnchor
            value={contact.sns.facebook}
            defaultValue={"Facebook"}
            placeholder={"Facebook"}
            handleChange={(e) => handleSnsChange({ facebook: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
          />
          <MoleculeInputAnchor
            value={contact.sns.url1}
            defaultValue={"Website"}
            placeholder={"URL"}
            handleChange={(e) => handleSnsChange({ url1: e.target.value })}
            inputStyle={ContactInput}
            StyledAnchor={ContactAnchor}
          />
        </Contact_1>
      </Contact1Container>
    </ContactContainer>
  );
};


const ContactContainer = styled.section`
  width: 50%;
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
  height: fit-content;

  padding: 2px 0px;

  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_02_2};
`

const ContactAnchor = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  width: 20%;
  height: 20px;

  padding: 2px 0px;
  text-decoration: underline;

  color: ${({ theme }) => theme.colors.color_Gray_02};
  ${({ theme }) => theme.typography.Body_02_2};
  cursor: pointer;
`



export default ContactComp;
