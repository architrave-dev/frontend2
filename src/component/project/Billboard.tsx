import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useBillboard } from '../../shared/hooks/useApi/useBillboard';
import { useAui } from '../../shared/hooks/useAui';
import { TextAreaBillboard } from '../../shared/component/headless/textarea/TextAreaBody';
import { InputBillboard } from '../../shared/component/headless/input/InputBody';
import HeadlessBtn from '../../shared/component/headless/button/HeadlessBtn';
import { BtnConfirm } from '../../shared/component/headless/button/BtnBody';
import Loading from '../../shared/component/Loading';
import { BillboardData } from '../../shared/dto/EntityRepository';
import { TextAlignment } from '../../shared/enum/EnumRepository';
import { useBillboardStoreForUpdate } from '../../shared/store/billboardStore';
import MoleculeImgDivContainer from '../../shared/component/molecule/MoleculeImgDivContainer';
import { StyledImgDivContainerProps } from '../../shared/dto/StyleCompRepository';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';


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

  const isChanged = (): boolean => {
    return (
      billboard.title !== updateBillboardDto.title ||
      billboard.description !== updateBillboardDto.description ||
      billboard.originUrl !== updateBillboardDto.originUrl ||
      billboard.thumbnailUrl !== updateBillboardDto.thumbnailUrl ||
      billboard.isVisible !== updateBillboardDto.isVisible
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
    <MoleculeImgDivContainer
      backgroundImg={updateBillboardDto.originUrl}
      handleChange={setOriginThumbnailUrl}
      StyledImgDivContainer={Container}
    >
      <MoleculeInputDiv
        value={updateBillboardDto.title}
        placeholder={"title"}
        handleChange={(e) => handleChange('title', e.target.value)}
        inputStyle={InputBillboard}
        StyledDiv={Title}
      />
      <MoleculeTextareaDescription
        value={updateBillboardDto.description}
        handleChange={(e) => handleChange('description', e.target.value)}
        alignment={TextAlignment.LEFT}
        StyledTextarea={TextAreaBillboard}
        StyledDescription={Description}
      />
      {isEditMode && isChanged() &&
        <HeadlessBtn
          value={"Confirm"}
          handleClick={handleConfirm}
          StyledBtn={BtnConfirm}
        />
      }
    </MoleculeImgDivContainer>
  );
};

const Container = styled.div<StyledImgDivContainerProps>`
  position: relative;

  background-image: url(${props => props.$backgroundImg});
  background-size: cover;
  background-position: center;

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 6vw;
`;

const Title = styled.div`
  width: 70%;
  padding: 6px 0px;
  margin-bottom: 20px;
  ${({ theme }) => theme.typography.H_01};
`;

const Description = styled.div`
width: 60%;;
min-height: 10vh;
padding: 8px 0px;
margin-bottom: 20px;
${({ theme }) => theme.typography.Body_01_1};
`;


export default Billboard;
