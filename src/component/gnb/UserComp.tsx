import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEditMode } from '../../shared/hooks/useEditMode';
import { extractUsernameFromAui, useAuth } from '../../shared/hooks/useAuth';
import { useModal } from '../../shared/hooks/useModal';
import { ModalType } from '../../shared/store/modalStore';
import { useAui } from '../../shared/hooks/useAui';
import { UserData } from '../../shared/store/authStore';

const UserComp: React.FC = () => {
  const navigate = useNavigate();
  const { aui } = useAui();

  const { isEditMode, setEditMode } = useEditMode();
  const { user, logout } = useAuth();
  const { openModal } = useModal();


  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const handleUserAction = () => {
    if (user) {
      compareAuiLoggedInAui(user);
    } else {
      openModal(ModalType.LOGIN);
    }
  };

  const compareAuiLoggedInAui = (user: UserData) => {
    if (aui && aui === user.aui) {
      if (window.confirm("Do you want to log out?")) logout();
    } else {
      navigate(`/${aui}`);
    }
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
        {extractUsernameFromAui(aui)}
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