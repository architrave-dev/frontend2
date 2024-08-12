import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { useAuiValidation } from '../../shared/hooks/useAuiValidation';
import { useAuth, validateUserOwner } from '../../shared/hooks/useAuth';
import { useModal } from '../../shared/hooks/useModal';
import { ModalType } from '../../shared/store/modalStore';

const UserComp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const AUI = useAuiValidation();

  const { isEditMode, setEditMode } = useEditMode();
  const { user, logout } = useAuth();
  const { openModal } = useModal();


  const toggleEditMode = () => {
    if (!user) {
      return;
    }
    setEditMode(!isEditMode);
  };

  const handleUserAction = () => {
    if (!AUI) {
      console.error('AUI is undefined');
      return;
    }
    if (user) {
      if (validateUserOwner(user.username, AUI)) {
        if (window.confirm("Do you want to log out?")) {
          logout();
        }
      } else {
        navigate(`/${AUI}`);
      }
    } else {
      openModal(ModalType.LOGIN);
    }
  };

  if (location.pathname === '/' || !AUI) {
    return null;
  }

  return (
    <UserArticle>
      {user && (
        <EditToggle
          onClick={toggleEditMode}>
          {isEditMode ? 'Complete' : 'Edit'}
        </EditToggle>
      )}
      <ArtistName onClick={handleUserAction}>
        {AUI}
      </ArtistName>
    </UserArticle>
  );
}

const UserArticle = styled.article`
  width: calc(14vw);
  max-width: 100px;

  display: flex;
  align-items: center;
  justify-content: space-between; 

  font-size: ${({ theme }) => theme.fontSize.font_B01};
`;

const ArtistName = styled.div`
  text-decoration: none;
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
  cursor: pointer;
`;

const EditToggle = styled.div`
  text-decoration: none;
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
  cursor: pointer;
`;

export default UserComp;