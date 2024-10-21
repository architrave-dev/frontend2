import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useBillboard } from '../../shared/hooks/useApi/useBillboard';
import defaultImg from '../../asset/project/default_1.png';
import { useAui } from '../../shared/hooks/useAui';
import ReplaceImageButton from '../../shared/component/ReplaceImageButton';
import HeadlessTextArea from '../../shared/component/headless/textarea/HeadlessTextArea';
import { TextAreaBillboard } from '../../shared/component/headless/textarea/TextAreaBody';
import HeadlessInput from '../../shared/component/headless/input/HeadlessInput';
import { InputBillboard } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import Loading from '../../shared/component/Loading';
import { BillboardData } from '../../shared/dto/EntityRepository';
import { TextBoxAlignment } from '../../shared/enum/EnumRepository';
import { useBillboardStoreForUpdate } from '../../shared/store/billboardStore';


const Billboard: React.FC = () => {
  const { isEditMode, setEditMode } = useEditMode();
  const { isLoading, billboard, getBillboard, updateBillboard } = useBillboard();
  const { updateBillboardDto, setUpdateBillboardDto } = useBillboardStoreForUpdate();

  const { aui } = useAui();

  useEffect(() => {
    const getBillboardWithApi = async () => {
      if (!aui) return;
      try {
        console.log("getting billboard...")
        await getBillboard(aui);
      } catch (error) { }
    }
    getBillboardWithApi();
  }, [aui]);


  if (!billboard || !updateBillboardDto) {
    return null;
  }

  const handleChange = (field: keyof BillboardData, value: string | number) => {
    setUpdateBillboardDto({ ...updateBillboardDto, [field]: value });
  }
  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    setUpdateBillboardDto({
      ...updateBillboardDto,
      originUrl,
      thumbnailUrl,
    });
  }

  const isChanged = (initialData: BillboardData, currentData: BillboardData): boolean => {
    return (
      initialData.title !== currentData.title ||
      initialData.description !== currentData.description ||
      initialData.originUrl !== currentData.originUrl ||
      initialData.thumbnailUrl !== currentData.thumbnailUrl ||
      initialData.isVisible !== currentData.isVisible
    );
  };


  const handleConfirm = async () => {
    if (!billboard) return;
    if (!updateBillboardDto) return;

    try {
      await updateBillboard(aui, updateBillboardDto);
    } catch (err) {
    } finally {
      setEditMode(false);
    }
  };

  // 로딩 상태를 처리합니다.
  if (isLoading) return <Loading />;

  return (
    <Container $backgroundimage={updateBillboardDto.originUrl === '' ? defaultImg : updateBillboardDto.originUrl}>
      {isEditMode ? (
        <>
          <ReplaceImageButton setImageUrl={setOriginThumbnailUrl} />
          <HeadlessInput
            type={'text'}
            value={updateBillboardDto.title}
            handleChange={(e) => handleChange('title', e.target.value)}
            placeholder={"Enter title"}
            StyledInput={InputBillboard}
          />
          <HeadlessTextArea
            alignment={TextBoxAlignment.LEFT}
            content={updateBillboardDto.description}
            placeholder={"Enter description"}
            handleChange={(e) => handleChange('description', e.target.value)}
            StyledTextArea={TextAreaBillboard}
          />
          {isChanged(billboard, updateBillboardDto) &&
            <HeadlessBtn
              value={"Confirm"}
              handleClick={handleConfirm}
              StyledBtn={BtnConfirm}
            />
          }
        </>
      ) : (
        <>
          <Title>{updateBillboardDto.title}</Title>
          <Description>{updateBillboardDto.description}</Description>
        </>
      )}
    </Container>
  );
};

const Container = styled.div<{ $backgroundimage: string | undefined }>`
  position: relative;

  background-image: url(${props => props.$backgroundimage});
  background-size: cover;
  background-position: center;

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 6vw;
`;

const Title = styled.h1`
max-width: 60vw;
padding: 0.5rem;
margin-bottom: 20px;
${({ theme }) => theme.typography.H_01};
`;

const Description = styled.p`
max-width: 70vw;
min-height: 7vh;
margin-bottom: 20px;
padding: 0.5rem;
${({ theme }) => theme.typography.Body_01};
`;


export default Billboard;
