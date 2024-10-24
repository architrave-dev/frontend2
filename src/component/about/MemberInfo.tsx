import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAui } from '../../shared/hooks/useAui';
import { useMemberInfo } from '../../shared/hooks/useApi/useMemberInfo';
import { useMemberInfoStoreForUpdate } from '../../shared/store/memberInfoStore';
import MemberInfoEach from './MemberInfoEach';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import Loading from '../../shared/component/Loading';
import { MemberInfoData } from '../../shared/dto/EntityRepository';
import MemberTitle from './MemberTitle';
import { TextAreaMemberInfo } from '../../shared/component/headless/textarea/TextAreaBody';
import MoleculeImgDivContainer from '../../shared/component/molecule/MoleculeImgDivContainer';
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';


const MemberInfo: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { isLoading, memberInfo, getMemberInfo, updateMemberInfo } = useMemberInfo();
  const { updateMemberInfoDto, setUpdateMemberInfoDto } = useMemberInfoStoreForUpdate();

  const { aui } = useAui();

  useEffect(() => {
    const getMemberInfoWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting work List...")
        await getMemberInfo(aui);
      } catch (error) { }
    }
    getMemberInfoWithApi();
  }, [aui]);


  if (!memberInfo || !updateMemberInfoDto) {
    return null;
  }

  const handleChange = (field: keyof MemberInfoData, value: string | number) => {
    setUpdateMemberInfoDto({ ...updateMemberInfoDto, [field]: value });
  }
  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    setUpdateMemberInfoDto({
      ...updateMemberInfoDto,
      originUrl,
      thumbnailUrl,
    });
  }

  const isChanged = (): boolean => {
    return (
      memberInfo.originUrl !== updateMemberInfoDto.originUrl ||
      memberInfo.name !== updateMemberInfoDto.name ||
      memberInfo.year !== updateMemberInfoDto.year ||
      memberInfo.country !== updateMemberInfoDto.country ||
      memberInfo.email !== updateMemberInfoDto.email ||
      memberInfo.contact !== updateMemberInfoDto.contact ||
      memberInfo.description !== updateMemberInfoDto.description
    );
  };

  const handleConfirm = async () => {
    if (!memberInfo) return;
    if (!updateMemberInfoDto) return;

    try {
      await updateMemberInfo(aui, updateMemberInfoDto);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <MemberInfoComp>
      <ProfileAndInfo>
        <MoleculeImgDivContainer
          backgroundImg={updateMemberInfoDto.originUrl}
          handleChange={setOriginThumbnailUrl}
          StyledImgDivContainer={Profile}
        />
        <InfoContainer>
          <MemberTitle
            value={updateMemberInfoDto.name}
            handleChange={(e) => handleChange('name', e.target.value)}
          />
          <MemberInfoEach name={"Year"} value={updateMemberInfoDto.year} handleChange={(e) => handleChange('year', e.target.value)} />
          <MemberInfoEach name={"Country"} value={updateMemberInfoDto.country} handleChange={(e) => handleChange('country', e.target.value)} />
          <MemberInfoEach name={"Email"} value={updateMemberInfoDto.email} handleChange={(e) => handleChange('email', e.target.value)} />
          <MemberInfoEach name={"Contact"} value={updateMemberInfoDto.contact} handleChange={(e) => handleChange('contact', e.target.value)} />
        </InfoContainer>
      </ProfileAndInfo>
      <DescriptionWrapper>
        <MoleculeTextareaDescription
          value={updateMemberInfoDto.description}
          handleChange={(e) => handleChange('description', e.target.value)}
          textareaStyle={TextAreaMemberInfo}
          StyleDescription={Description}
        />
      </DescriptionWrapper>
      {isEditMode && isChanged() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
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
