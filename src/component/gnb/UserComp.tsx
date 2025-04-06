import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAuth } from '../../shared/hooks/useApi/useAuth';
import { useAui } from '../../shared/hooks/useAui';
import { useStandardAlertStore } from '../../shared/store/portal/alertStore';
import { AlertPosition, AlertType, ModalType } from '../../shared/enum/EnumRepository';
import { useMenu } from '../../shared/hooks/useMenu';
import { useModalStore } from '../../shared/store/portal/modalStore';
import { useMemberInfoStore } from '../../shared/store/memberInfoStore';
import { useCareer } from '../../shared/hooks/useApi/useCareer';
import { useContactStore } from '../../shared/store/contactStore';
import { useBillboardStore } from '../../shared/store/billboardStore';
import { useWorkViewStore } from '../../shared/store/WorkViewStore';
import { useProjectChangeTrackingStore } from '../../shared/store/projectStore';


const UserComp: React.FC = () => {
  const navigate = useNavigate();
  const { aui } = useAui();
  const { isEditMode, setEditMode } = useEditMode();
  const { user, logout } = useAuth();
  const { isMenuOpen, closeMenu } = useMenu();
  const { setStandardModal } = useModalStore();
  const { setStandardAlert } = useStandardAlertStore();
  const { pathname } = useLocation();

  const { hasChanged: billboardChanged } = useBillboardStore();
  const { allChanged: projectChanged } = useProjectChangeTrackingStore();
  const { hasChanged: workViewChanged } = useWorkViewStore();
  const { hasChanged: memberInfoChanged } = useMemberInfoStore();
  const { hasChanged: contactChanged } = useContactStore();
  const { careerList } = useCareer();

  const pageExtracter = () => {
    const page = pathname.split("/")[2];
    const projectId = pathname.split("/")[3];
    if (projectId) {
      return "projectDetail";
    } else if (page === "" || page === "projects") {
      return "projects";
    } else if (page === "works") {
      return "works";
    } else if (page === "about") {
      return "about";
    } else if (page === "contact") {
      return "contact";
    } else if (page === "settings") {
      return "settings";
    } else {
      return "ERROR"
    }
  }

  const toggleEditMode = () => {
    const page = pageExtracter();
    console.log("page: ", page);
    let isChanged = false;
    switch (page) {
      case "about":
        const careerChanged = careerList.some((career) => career.hasChanged);
        isChanged = memberInfoChanged || careerChanged;
        break;
      case "contact":
        isChanged = contactChanged;
        break;
      case "projects":
        isChanged = billboardChanged;
        break;
      case "projectDetail":
        isChanged = projectChanged;
        break;
      case "settings":
        isChanged = false;
        break;
      case "works":
        isChanged = workViewChanged;
        break;
    }


    if (!isEditMode) {
      setEditMode(true);
    } else {
      if (isChanged) {
        setStandardAlert({
          type: AlertType.CONFIRM,
          position: AlertPosition.TOP,
          content: "You have unsaved changes. Are you sure you want to leave?\nAny unsaved changes will be discarded.",
          callBack: () => {
            // setEditMode(false);
            window.location.reload(); // 새로고침이 편하긴 해...
            // 일단 이렇게 해두자.
          }
        })
      } else {
        setEditMode(false);
      }
    }
  };

  const loginHandler = () => {
    setStandardModal({
      modalType: ModalType.LOGIN,
      title: null,
      value: null,
      handleChange: () => { }
    });
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