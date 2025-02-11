import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useMemberInfo } from '../../shared/hooks/useApi/useMemberInfo';
import MemberInfoEach from './MemberInfoEach';
import MemberTitle from './MemberTitle';
import { TextAreaMemberInfo } from '../../shared/component/headless/textarea/TextAreaBody';
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import { useValidation } from '../../shared/hooks/useValidation';
import { CountryType } from '../../shared/enum/EnumRepository';
import MemberInfoSelect from './MemberInfoSelect';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { useMemberInfoStore } from '../../shared/store/memberInfoStore';
import { MemberInfoData } from '../../shared/dto/EntityRepository';
import OptimizedMoleculeImgDivContainer from '../../shared/component/molecule/OptimizedMoleculeImgDivContainer';


const MemberInfo: React.FC = () => {
  const { aui } = useAui();
  const { memberInfo, getMemberInfo } = useMemberInfo();
  const { updatMemberInfo: handleChange,
    updateImage: handleImageChange } = useMemberInfoStore();
  const { checkType } = useValidation();


  useEffect(() => {
    const getMemberInfoWithApi = async () => {
      if (!aui) return;
      console.log("getting work List...")
      await getMemberInfo(aui);
    }
    getMemberInfoWithApi();
  }, [aui]);

  const handleChangeWithValidate = (updates: Partial<MemberInfoData>) => {
    for (const key in updates) {
      const field = key as keyof MemberInfoData;
      const value = updates[field];
      const isValid = checkType(field, value as string);
      if (!isValid) {
        return;
      }
    }
    handleChange(updates);
  }


  if (!memberInfo) {
    return null;
  }

  return (
    <MemberInfoComp>
      <ProfileAndInfo>
        <OptimizedMoleculeImgDivContainer
          backgroundImg={convertS3UrlToCloudFrontUrl(memberInfo.uploadFile.originUrl)}
          handleChange={handleImageChange}
          StyledImgDivContainer={Profile}
        />
        <InfoContainer>
          <MemberTitle
            value={memberInfo.name}
            handleChange={(e) => handleChange({ name: e.target.value })}
          />
          <MemberInfoEach name={"Born"} value={memberInfo.year} handleChange={(e) => handleChangeWithValidate({ year: e.target.value })} />
          <MemberInfoSelect name={"Country"} value={memberInfo.country} handleChange={(value: CountryType) => handleChangeWithValidate({ country: value })} />
          <MemberInfoEach name={"Email"} value={memberInfo.email} handleChange={(e) => handleChangeWithValidate({ email: e.target.value })} />
          <MemberInfoEach name={"Contact"} value={memberInfo.contact} handleChange={(e) => handleChange({ contact: e.target.value })} />
        </InfoContainer>
      </ProfileAndInfo>
      <DescriptionWrapper>
        <MoleculeTextareaDescription
          value={memberInfo.description}
          handleChange={(e) => handleChange({ description: e.target.value })}
          StyledTextarea={TextAreaMemberInfo}
          StyledDescription={Description}
        />
      </DescriptionWrapper>
    </MemberInfoComp>
  );
};


const MemberInfoComp = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  margin-top: 60px;
`;
const ProfileAndInfo = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  margin-bottom: 30px;

  // background-color: #ffcd74;
`;

const Profile = styled.div<StyledImgDivContainerProps>`
  height: 28vh; 
  width: calc(28vh * (3 / 4));

  background-image: url(${props => props.$backgroundImg});
  background-size: cover;
  background-position: center;
  position: relative;

  margin-right: 30px;
`;

const InfoContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  gap: 4px;
  // background-color: #ffedbf;
`;

const DescriptionWrapper = styled.div`
  width: 60%;
`;
const Description = styled.div`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: left;
  margin-bottom: 5px;
  ${({ theme }) => theme.typography.Body_02_2};
`;


export default MemberInfo;
