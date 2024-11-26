import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useOriginImgStore } from '../../store/portal/originImgStore';
import { OriginBtn } from '../headless/button/BtnBody';
import { ModalType } from '../../enum/EnumRepository';
import HeadlessBtn from '../headless/button/HeadlessBtn';

export interface MoleculeShowOriginBtnProps {
  originUrl: string;
}

const MoleculeShowOriginBtn: React.FC<MoleculeShowOriginBtnProps> = ({ originUrl }) => {
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
      StyledBtn={OriginBtn}
    />
  );
}

export default MoleculeShowOriginBtn;