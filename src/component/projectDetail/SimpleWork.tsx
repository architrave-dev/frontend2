import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../asset/project/default_1.png'
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { WorkSimpleData } from '../../shared/dto/EntityRepository';


interface SimpleWorkProps {
  data: WorkSimpleData;
  onClickHandler: (workId: string) => void;
}

const SimpleWork: React.FC<SimpleWorkProps> = ({ data, onClickHandler }) => {

  return (
    <SimpleWorkComp key={data.id} onClick={() => onClickHandler(data.id)}>
      <ImgWrapper>
        <WorkImage src={data.originUrl === '' ? defaultImg : convertS3UrlToCloudFrontUrl(data.originUrl)} alt={data.title} />
      </ImgWrapper>
      <SimpleDiv>{data.title}</SimpleDiv>
    </SimpleWorkComp>
  );
};

const SimpleWorkComp = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;

  cursor: pointer;
`
const WorkImage = styled.img`
  //부모 크기에 맞춤
  width: 100%;
  height: 100%; 
  object-fit: contain;
`;

const SimpleDiv = styled.div`
text-align: right;
${({ theme }) => theme.typography.Body_03_2};
`

export default SimpleWork;