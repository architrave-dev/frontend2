import React from 'react';
import styled from 'styled-components';
import { useAui } from '../../shared/hooks/useAui';
import { useWorkViewStoreForUpdate } from '../../shared/store/WorkViewStore';
import { WorkData, WorkDetailData } from '../../shared/dto/EntityRepository';
import MoleculeImg from '../../shared/component/molecule/MoleculeImg';
import MoleculeInputDiv from '../../shared/component/molecule/MoleculeInputDiv';

interface WorkDetailProps {
  data: WorkDetailData;
  // textAlignment?
}


const WorkDetail: React.FC<WorkDetailProps> = ({
  data
}) => {

  const handleChange = (field: keyof WorkDetailData, value: string) => {
    console.log("handle change")
  }

  const isChanged = (initialData: WorkDetailData, currentData: WorkDetailData): boolean => {
    return (
      initialData.originUrl !== currentData.originUrl ||
      initialData.thumbnailUrl !== currentData.thumbnailUrl ||
      initialData.description !== currentData.description
    );
  };

  const handleUpdate = async () => {
    console.log("update this")
  };

  const handleDelete = async () => {
    console.log("delete this")
  };

  const setOriginThumbnailUrl = (thumbnailUrl: string, originUrl: string) => {
    console.log("change img")
  }

  return (
    <WorkDetailWrapper>
      <ImgWrapper>
        <MoleculeImg
          srcUrl={data.originUrl}
          alt={"Work Detail"}
          displaySize={null}
          handleChange={(thumbnailUrl: string, originUrl: string) => setOriginThumbnailUrl(thumbnailUrl, originUrl)}
          StyledImg={WorkImage}
        />
      </ImgWrapper>
      <MoleculeInputDiv
        value={data.description}
        placeholder={"detail description"}
        handleChange={(e) => handleChange('description', e.target.value)}
        inputStyle={InputDescription}
        StyledDiv={Description}
      />
      {/* {confrim, delete btn} */}
    </WorkDetailWrapper>
  );
}

const WorkDetailWrapper = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  // background-color: #eae7dc;
`;

const ImgWrapper = styled.div`
  position: relative;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
`

const WorkImage = styled.img`
  //부모 크기에 맞춤
  width: 100%;
  height: 100%; 
  //이미지 크기에 맞춤
  // max-width: 100%; 
  // max-height: 100%;
  object-fit: contain;
`;

const InputDescription = styled.input``;
const Description = styled.div``;


export default WorkDetail;