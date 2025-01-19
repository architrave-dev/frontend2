import React from 'react';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useProjectElementListStore } from '../../shared/store/projectElementStore';
import SelectBox from '../../shared/component/SelectBox';
import { TextAreaTextBox, getAlignment } from '../../shared/component/headless/textarea/TextAreaBody';
import { DocumentData } from '../../shared/dto/EntityRepository';
import { ProjectElementType, SelectType, TextAlignment, DisplaySize } from '../../shared/enum/EnumRepository';
import { SelectBoxWrapper, WorkImage } from './Work';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeTextareaDescription from '../../shared/component/molecule/MoleculeTextareaDescription';
import MoleculeShowOriginBtn from '../../shared/component/molecule/MoleculeShowOriginBtn';
import { OriginBtnRight } from '../../shared/component/headless/button/BtnBody';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';


export interface DocumentProps {
  peId: string;
  data: DocumentData;
  alignment: TextAlignment;
}

const Document: React.FC<DocumentProps> = ({ peId, alignment, data }) => {
  const { isEditMode } = useEditMode();
  const { updateDocument: handleChange,
    updateImage: handleImageChange,
    updateTextAlignment } = useProjectElementListStore();

  return (
    <DocumentWrapper>
      {isEditMode &&
        <SelectBoxContainer>
          <SelectBoxWrapper>
            <SelectBox
              value={alignment}
              selectType={SelectType.TEXT_ALIGNMENT}
              handleChange={(value) => updateTextAlignment(peId, value)}
              direction={false} />
          </SelectBoxWrapper>
        </SelectBoxContainer>
      }
      <ImgWrapper>
        <MoleculeShowOriginBtn originUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)} styledBtn={OriginBtnRight} />
        <MoleculeImg
          srcUrl={convertS3UrlToCloudFrontUrl(data.uploadFile.originUrl)}
          alt={data.description}
          displaySize={DisplaySize.REGULAR}
          handleChange={(thumbnailUrl: string, originUrl: string) =>
            handleImageChange(
              peId,
              ProjectElementType.DOCUMENT,
              thumbnailUrl,
              originUrl
            )}
          StyledImg={WorkImage}
        />
      </ImgWrapper>
      <MoleculeTextareaDescription
        value={data.description}
        handleChange={(e) => handleChange(peId, { description: e.target.value })}
        alignment={alignment}
        StyledTextarea={TextAreaTextBox}
        StyledDescription={DocumentContent}
      />
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

const DocumentContent = styled.div<{ $alignment: TextAlignment }>`
  width: 100%;
  padding: 8px 0px;
  color: ${({ theme }) => theme.colors.color_Gray_03};
  text-align: ${({ $alignment }) => getAlignment($alignment)};
`;

export const ImgWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
`

export const TitleInfoWrpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Document;