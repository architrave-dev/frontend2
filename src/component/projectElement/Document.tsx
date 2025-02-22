import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { DocumentData } from '../../shared/dto/EntityRepository';
import { SelectType, TextAlignment, DisplaySize, DisplayAlignment } from '../../shared/enum/EnumRepository';
import { SelectBoxWrapper, WorkImage } from './Work';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { OriginBtnRight } from '../../shared/component/headless/button/BtnBody';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';


export interface DocumentProps {
  peId: string;
  data: DocumentData;
  alignment: DisplayAlignment;
}

const Document: React.FC<DocumentProps> = ({ peId, alignment, data }) => {
  const { isEditMode } = useEditMode();
  const { updateDocument: handleChange,
    updateImage: handleImageChange,
    updateDisplayAlignment } = useProjectElementListStore();

  return (
    <DocumentWrapper>
      {isEditMode &&
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <SelectBox
              value={alignment}
              selectType={SelectType.DISPLAY_ALIGNMENT}
              handleChange={(value) => updateDisplayAlignment(peId, value)}
              direction={false} />
          </SelectBoxWrapper>
        </SelectBoxContainer>
      }
      <DocumentCoreWrapper $displayAlignment={alignment || DisplayAlignment.CENTER}>
        <ImgWrapper $displayAlignment={alignment || DisplayAlignment.CENTER}>
          <MoleculeShowOriginBtn originUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)} styledBtn={OriginBtnRight} />
          <MoleculeImg
            srcUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)}
            alt={data.description}
            displaySize={DisplaySize.REGULAR}
            handleChange={(originUrl: string) =>
              handleImageChange(
                peId,
                originUrl
              )}
            StyledImg={WorkImage}
          />
        </ImgWrapper>
        <MoleculeTextareaDescription
          value={data.description}
          handleChange={(e) => handleChange(peId, { description: e.target.value })}
          StyledTextarea={TextAreaTextBox}
          StyledDescription={DocumentContent}
        />
      </DocumentCoreWrapper>
    </DocumentWrapper >
  );
}

export const DocumentWrapper = styled.div`
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

export const DocumentCoreWrapper = styled.div<{ $displayAlignment: DisplayAlignment }>`
  display: flex;
  flex-direction: ${({ $displayAlignment }) => {
    switch ($displayAlignment) {
      case DisplayAlignment.CENTER:
        return 'column';
      case DisplayAlignment.RIGHT:
        return 'row-reverse';
      case DisplayAlignment.LEFT:
      default:
        return 'row';
    }
  }};
  gap: ${({ $displayAlignment }) => {
    switch ($displayAlignment) {
      case DisplayAlignment.CENTER:
        return '16px';
      default:
        return '10px';
    }
  }};
`;

const DocumentContent = styled.div<{ $textAlignment: TextAlignment }>`
  width: 100%;
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $textAlignment }) => getAlignment($textAlignment)};
`;

export const ImgWrapper = styled.div<{ $displayAlignment: DisplayAlignment }>`
  position: relative;
  width: ${({ $displayAlignment }) => {
    switch ($displayAlignment) {
      case DisplayAlignment.CENTER:
        return '100%';
      default:
        return '80%';
    }
  }};
`;


export default Document;