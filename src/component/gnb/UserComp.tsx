import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { useModal } from '../../shared/hooks/useModal';
import { useAui } from '../../shared/hooks/useAui';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType, ModalType } from '../../shared/enum/EnumRepository';
import { useMenu } from '../../shared/hooks/useMenu';

const UserComp: React.FC = () => {
  const navigate = useNavigate();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { user, logout } = useAuth();
  const { isMenuOpen, closeMenu } = useMenu();
  const { openModal } = useModal();
  const { setStandardAlert } = useStandardAlertStore();


  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const loginHandler = () => {
    openModal(ModalType.LOGIN);
  };

  const logoutHandler = () => {
    setStandardAlert({
      type: AlertType.CONFIRM,
      position: AlertPosition.TOP,
      content: "Do you want to log out?",
      callBack: logout
    })
    closeMenu();
  };

  const goHome = () => {
    closeMenu();
    navigate(`/`);
  }

  const renderGeneralBtn = () => {
    //로그인 되어있으면
    if (user && user.aui === aui) {
      if (isMenuOpen) {
        return (<WithMenuBtn $isMenuOpen={isMenuOpen} onClick={logoutHandler}>Logout</WithMenuBtn>);
      } else {
        return (<WithNoMenuBtn $isMenuOpen={isMenuOpen} onClick={toggleEditMode} > {isEditMode ? "Done" : "Edit"}</WithNoMenuBtn>);
      }
    } else {
      if (isMenuOpen) {
        return (<WithMenuBtn $isMenuOpen={isMenuOpen} onClick={goHome}>Home</WithMenuBtn>);
      } else {
        return (<WithNoMenuBtn $isMenuOpen={isMenuOpen} onClick={loginHandler}>Login</WithNoMenuBtn>);
      }
    }
  }

  return (
    <Btn>
      {renderGeneralBtn()}
    </Btn>
  );
}

const Btn = styled.article`
  width: calc(8vw);
  max-width: 80px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;

  transition: all 0.2s ease;
  cursor: pointer;

  z-index: 3;
  ${({ theme }) => theme.typography.Body_02_2};
`

const WithMenuBtn = styled.article<{ $isMenuOpen: boolean; }>`
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? 1 : 0)};
  transition: opacity 0.2s ease;
  `;

const WithNoMenuBtn = styled.div<{ $isMenuOpen: boolean; }>`
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? 0 : 1)};
  transition: opacity 0.2s ease;
  `;

export default UserComp;