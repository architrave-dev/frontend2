import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAui } from '../../shared/hooks/useAui';
import { useMemberInfo } from '../../shared/hooks/useApi/useMemberInfo';
import { useMemberInfoStoreForUpdate } from '../../shared/store/memberInfoStore';
import MemberInfoEach from './MemberInfoEach';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaMemberInfo } from '../../shared/component/headless/textarea/TextAreaBody';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import defaultImg from '../../asset/project/default_1.png';
import Loading from '../../shared/component/Loading';
import { MemberInfoData } from '../../shared/dto/EntityRepository';
import { TextBoxAlignment } from '../../shared/enum/EnumRepository';
import MemberTitle from './MemberTitle';


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

  const isChanged = (initialData: MemberInfoData, currentData: MemberInfoData): boolean => {
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.name !== currentData.name ||
      initialData.year !== currentData.year ||
      initialData.country !== currentData.country ||
      initialData.email !== currentData.email ||
      initialData.contact !== currentData.contact ||
      initialData.description !== currentData.description
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
        <Profile $backgroundimage={updateMemberInfoDto.originUrl === '' ? defaultImg : updateMemberInfoDto.originUrl} >
          <ReplaceImageButton setImageUrl={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)} />
        </Profile>
        <InfoContainer>
          <MemberTitle
            name={"Name"}
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
        {isEditMode ? (
          <HeadlessTextArea
            alignment={TextBoxAlignment.LEFT}
            content={updateMemberInfoDto.description}
            placeholder="Enter description"
            handleChange={(e) => handleChange('description', e.target.value)}
            StyledTextArea={TextAreaMemberInfo}
          />
        ) : (
          <Description>
            {updateMemberInfoDto.description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Description>
        )}
      </DescriptionWrapper>
      {isEditMode && isChanged(memberInfo, updateMemberInfoDto) &&
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

const Profile = styled.div<{ $backgroundimage: string }>`
  height: 28vh; 
  width: calc(28vh * (3 / 4));

  background-image: url(${props => props.$backgroundimage});
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

  gap: 5px;
  // background-color: #ffedbf;
`;

const DescriptionWrapper = styled.div`
  width: 65%;
`;
const Description = styled.div`
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: left;
  margin-bottom: 4px;
  ${({ theme }) => theme.typography.Body_02_2};
`;



export default MemberInfo;
