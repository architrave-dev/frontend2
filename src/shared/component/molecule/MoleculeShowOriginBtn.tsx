import React from 'react';
import { AlertPosition, AlertType, ModalType } from '../../enum/EnumRepository';
import HeadlessBtn from '../headless/button/HeadlessBtn';
import { StyledBtnComponent } from '../../dto/StyleCompRepository';
import { useStandardAlertStore } from '../../store/portal/alertStore';
import { useEditMode } from '../../hooks/useEditMode';
import { useModalStore } from '../../store/portal/modalStore';

export interface MoleculeShowOriginBtnProps {
  originUrl: string;
  styledBtn: StyledBtnComponent;
}

const MoleculeShowOriginBtn: React.FC<MoleculeShowOriginBtnProps> = ({ originUrl, styledBtn }) => {
  const { setStandardModal } = useModalStore();
  const { isEditMode } = useEditMode();
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
    setStandardModal({
      modalType: ModalType.ORIGIN_IMG,
      title: null,
      value: originUrl,
      handleChange: () => { }
    });
  }
  if (isEditMode) {
    return null;
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