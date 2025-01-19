import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import { InputWorkTitle } from '../../shared/component/headless/input/InputBody';
import { SelectType, DisplayAlignment, DisplaySize, ProjectElementType } from '../../shared/enum/EnumRepository';
import { WorkDetailData } from '../../shared/dto/EntityRepository';
import SelectBox from '../../shared/component/SelectBox';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { OriginBtnBottom } from '../../shared/component/headless/button/BtnBody';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';


export interface DetailProps {
  peId: string;
  alignment: DisplayAlignment;
  displaySize: DisplaySize;
  data: WorkDetailData;
}

const Work: React.FC<DetailProps> = ({ peId, alignment, displaySize, data }) => {
  const { isEditMode } = useEditMode();
  const {
    updateDetail: handleChange,
    updateImage: handleImageChange,
    updateDisplayAlignment: handleDisplayAlignmentChange,
    updateDisplaySize: handleDisplaySizeChange
  } = useProjectElementListStore();

  return (
    <WorkWrapper>
      {isEditMode &&
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <SelectBox
              value={displaySize || DisplaySize.BIG}
              selectType={SelectType.WORK_SIZE}
              handleChange={(value) => handleDisplaySizeChange(peId, value)}
              direction={false} />
          </SelectBoxWrapper>
          <SelectBoxWrapper>
            <SelectBox
              value={alignment || DisplayAlignment.CENTER}
              selectType={SelectType.DISPLAY_ALIGNMENT}
              handleChange={value => handleDisplayAlignmentChange(peId, value)}
              direction={false} />
          </SelectBoxWrapper>
        </SelectBoxContainer>
      }
      <WorkCoreWrapper $workAlignment={alignment || DisplayAlignment.CENTER}>
        <ImgWrapper $workAlignment={alignment || DisplayAlignment.CENTER}>
          <MoleculeShowOriginBtn originUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)} styledBtn={OriginBtnBottom} />
          <MoleculeImg
            srcUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)}
            alt={data.description}
            displaySize={displaySize}
            handleChange={(thumbnailUrl: string, originUrl: string) => handleImageChange(
              peId,
              ProjectElementType.DETAIL,
              thumbnailUrl,
              originUrl
            )}
            StyledImg={WorkImage}
          />
        </ImgWrapper>
        <TitleInfoWrpper $workAlignment={alignment || DisplayAlignment.CENTER}>
          <MoleculeInputDiv
            value={data.description}
            placeholder={"description"}
            handleChange={(e) => handleChange(peId, { description: e.target.value })}
            inputStyle={InputWorkTitle}
            StyledDiv={Title}
          />
        </TitleInfoWrpper>
      </WorkCoreWrapper>
    </WorkWrapper>
  );
};

export const WorkWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectBoxContainer = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  display: flex;
  gap: 20px;
`

export const WorkImage = styled.img<{ $displaySize: DisplaySize }>`
  max-width: 100%;
  max-height: ${({ $displaySize }) => {
    switch ($displaySize) {
      case DisplaySize.SMALL:
        return '35vh';
      case DisplaySize.REGULAR:
        return '55vh';
      case DisplaySize.BIG:
      default:
        return '90vh';
    }
  }};
  object-fit: contain;
`;

export const WorkCoreWrapper = styled.div<{ $workAlignment: DisplayAlignment }>`
  display: flex;
  flex-direction: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return 'column';
      case DisplayAlignment.RIGHT:
        return 'row-reverse';
      case DisplayAlignment.LEFT:
      default:
        return 'row';
    }
  }};
  gap: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return '10px';
      default:
        return '0px';
    }
  }};
`;

export const ImgWrapper = styled.div<{ $workAlignment: DisplayAlignment }>`
  position: relative;
  width: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return '100%';
      default:
        return '80%';
    }
  }};
`

export const TitleInfoWrpper = styled.div<{ $workAlignment: DisplayAlignment }>`
  width: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return '100%';
      default:
        return '20%';
    }
  }};

  display: flex;
  flex-direction: column;
  justify-content: ${({ $workAlignment }) => {
    switch ($workAlignment) {
      case DisplayAlignment.CENTER:
        return 'flex-start';
      default:
        return 'flex-end';
    }
  }};
  align-items: center;
`

export const SelectBoxWrapper = styled.article`
  width: 8vw;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  ${({ theme }) => theme.typography.Body_04};
`;

const Title = styled.h2`
  width: 100%;
  height: 18px;
  padding: 0px 8px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.colors.color_Gray_04};
  text-align: center;
  ${({ theme }) => theme.typography.Body_02_2};
`;

export default Work;
