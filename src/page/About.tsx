import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberInfo from '../component/about/MemberInfo';
import CareerList from '../component/about/CareerList';
import { useInitPage } from '../shared/hooks/useInitPage';
import { useEditMode } from '../shared/hooks/useEditMode';
import { useMemberInfo } from '../shared/hooks/useApi/useMemberInfo';
import HeadlessBtn from '../shared/component/headless/button/HeadlessBtn';
import { BtnFloat } from '../shared/component/headless/button/BtnBody';
import { UpdateMemberInfoReq } from '../shared/dto/ReqDtoRepository';
import { useAui } from '../shared/hooks/useAui';
import { ServiceType } from '../shared/enum/EnumRepository';
import { useLoadingStore } from '../shared/store/loadingStore';
import Loading from '../shared/component/Loading';
import { useMemberInfoStore } from '../shared/store/memberInfoStore';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import DocumentCV from '../component/about/DocumentCV';
import { useCareer } from '../shared/hooks/useApi/useCareer';
import downloadIcon from '../asset/icon/download.png';
import HeadlessIconBtn from '../shared/component/headless/button/HeadlessIconBtn';
import { useImage } from '../shared/hooks/useApi/useImage';
import { useShiftTab } from '../shared/hooks/useShiftTab';


const About: React.FC = () => {
  useInitPage();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { memberInfo, updateMemberInfo } = useMemberInfo();
  const { careerList } = useCareer();
  const { hasChanged: memberInfoChanged, imageChanged } = useMemberInfoStore();
  const { isLoading } = useLoadingStore();
  const { uploadImage } = useImage();
  const { handleShiftTabForEditMode } = useShiftTab();
  const [allChanged, setAllChanged] = useState(false);

  useEffect(() => {
    const careerChanged = careerList.some((career) => career.hasChanged);
    setAllChanged(memberInfoChanged || careerChanged);
  }, [careerList, memberInfoChanged]);

  const handleConfirm = async () => {
    if (!memberInfo || !aui) return;
    const { uploadFile, ...memberInfoWithoutUploadFile } = memberInfo;
    const baseRequest: UpdateMemberInfoReq = {
      ...memberInfoWithoutUploadFile,
      updateUploadFileReq: {
        originUrl: uploadFile.originUrl,
        uploadFileId: uploadFile.id
      }
    };

    const finalRequest = imageChanged
      ? await uploadImage(aui, ServiceType.MEMBER_INFO, baseRequest)
      : baseRequest;
    if (!finalRequest) return;

    await updateMemberInfo(aui, finalRequest as UpdateMemberInfoReq);
    setEditMode(false);
  };

  const handleDownloadPDF = async () => {
    if (!memberInfo) return;

    const blob = await pdf(
      <DocumentCV memberInfo={memberInfo} careerList={careerList} />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${memberInfo.name}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AboutContainer
      onKeyDown={(e) => handleShiftTabForEditMode(e, allChanged)}
      tabIndex={-1}>
      <Loading isLoading={isLoading} />
      {/* {memberInfo &&
        <Viewer>
          <PDFViewer style={{ height: '100vh' }}>
            <DocumentCV memberInfo={memberInfo} careerList={careerList} />
          </PDFViewer>
        </Viewer>
      } */}
      <MemberInfo />
      <CareerList />
      {isEditMode &&
        <BtnContainer>
          {memberInfoChanged &&
            <HeadlessBtn
              value={"Confirm"}
              handleClick={handleConfirm}
              StyledBtn={BtnFloat}
            />
          }
          <HeadlessIconBtn
            icon={downloadIcon}
            handleClick={handleDownloadPDF}
            StyledBtn={BtnFloat}
          />
        </BtnContainer>
      }
    </AboutContainer>
  );
}

export default About;

const AboutContainer = styled.div`
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

const Viewer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  right: calc(6vw);
  bottom: calc(8vh);
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5vw;

  padding: 4px 0px;
`