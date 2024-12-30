import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useContactStoreForUpdate } from '../../shared/store/contactStore';
import { useContact } from '../../shared/hooks/useApi/useContact';
import Loading from '../../shared/component/Loading';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';
import { ContactInput } from '../../shared/component/headless/input/InputBody';
import { UpdateContactReq } from '../../shared/dto/ReqDtoRepository';
import { SocialMedia } from '../../shared/dto/EntityRepository';


const ContactComp: React.FC = () => {
  const { aui } = useAui();
  const { isLoading, contact, getContact } = useContact();
  const { updateContactDto, setUpdateContactDto } = useContactStoreForUpdate();


  useEffect(() => {
    const getContactWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting work List...")
        await getContact(aui);
      } catch (error) { }
    }
    getContactWithApi();
  }, [aui]);


  if (!contact || !updateContactDto) {
    return null;
  }

  const handleChange = (field: keyof UpdateContactReq, value: string) => {
    setUpdateContactDto({ ...updateContactDto, [field]: value });
  }

  const handleSnsChange = (field: keyof SocialMedia, value: string) => {
    setUpdateContactDto({
      ...updateContactDto,
      sns: {
        ...updateContactDto.sns,
        [field]: value
      }
    });
  }


  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <ContactContainer>
      <ContactTitle>Contact</ContactTitle>
      <Contact1Container>
        <Contact_1>
          <MoleculeInputDiv
            value={updateContactDto.address}
            placeholder={"address"}
            handleChange={(e) => handleChange("address", e.target.value)}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
        </Contact_1>
        <Contact_1>
          <MoleculeInputDiv
            value={updateContactDto.email}
            placeholder={"email"}
            handleChange={(e) => handleChange("email", e.target.value)}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
          <MoleculeInputDiv
            value={updateContactDto.contact}
            placeholder={"contact"}
            handleChange={(e) => handleChange("contact", e.target.value)}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
        </Contact_1>
        <Contact_1>
          <MoleculeInputDiv
            value={updateContactDto.sns.instagram}
            placeholder={"Instagram"}
            handleChange={(e) => handleSnsChange("instagram", e.target.value)}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
          <MoleculeInputDiv
            value={updateContactDto.sns.twitter}
            placeholder={"X"}
            handleChange={(e) => handleSnsChange("twitter", e.target.value)}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
          <MoleculeInputDiv
            value={updateContactDto.sns.facebook}
            placeholder={"Facebook"}
            handleChange={(e) => handleSnsChange("facebook", e.target.value)}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
          />
          <MoleculeInputDiv
            value={updateContactDto.sns.url1}
            placeholder={"URL"}
            handleChange={(e) => handleSnsChange("url1", e.target.value)}
            inputStyle={ContactInput}
            StyledDiv={ContactDiv}
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




export default ContactComp;
