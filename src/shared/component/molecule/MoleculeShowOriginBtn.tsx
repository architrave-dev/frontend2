import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useOriginImgStore } from '../../store/portal/originImgStore';
import { AlertPosition, AlertType, ModalType } from '../../enum/EnumRepository';
import HeadlessBtn from '../headless/button/HeadlessBtn';
import { StyledBtnComponent } from '../../dto/StyleCompRepository';
import { useStandardAlertStore } from '../../store/portal/alertStore';

export interface MoleculeShowOriginBtnProps {
  originUrl: string;
  styledBtn: StyledBtnComponent;
}

const MoleculeShowOriginBtn: React.FC<MoleculeShowOriginBtnProps> = ({ originUrl, styledBtn }) => {
  const { openModal } = useModal();
  const { setOriginUrl } = useOriginImgStore();
  const { setStandardAlert } = useStandardAlertStore();

  const showOriginImg = () => {
    if (!originUrl) {
      setStandardAlert({
        type: AlertType.CONFIRM,
        position: AlertPosition.TOP,
        content: "There is no Image."
      })
      return;
    }
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