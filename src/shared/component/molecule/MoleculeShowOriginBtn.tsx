import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useOriginImgStore } from '../../store/portal/originImgStore';
import { ModalType } from '../../enum/EnumRepository';
import HeadlessBtn from '../headless/button/HeadlessBtn';
import { StyledBtnComponent } from '../../dto/StyleCompRepository';

export interface MoleculeShowOriginBtnProps {
  originUrl: string;
  styledBtn: StyledBtnComponent;
}

const MoleculeShowOriginBtn: React.FC<MoleculeShowOriginBtnProps> = ({ originUrl, styledBtn }) => {
  const { openModal } = useModal();
  const { setOriginUrl } = useOriginImgStore();

  const showOriginImg = () => {
    setOriginUrl(originUrl);
    openModal(ModalType.ORIGIN_IMG);
  }

  return (
    <HeadlessBtn
      value={"Origin"}
      handleClick={showOriginImg}
      StyledBtn={styledBtn}
    />
  );
}

export default MoleculeShowOriginBtn;