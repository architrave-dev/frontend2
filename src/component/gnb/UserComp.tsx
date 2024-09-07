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
    if (isEditMode) {
      alert("You are in edit mode.");
      return;
    }
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
      <ArtistName onClick={handleUserAction}>
        {extractUsernameFromAui(aui)}
      </ArtistName>
      {user && user.aui === aui && (
        <EditToggle
          onClick={toggleEditMode}>
          {isEditMode ? 'Done' : 'Edit'}
        </EditToggle>
      )}
    </UserArticle>
  );
}

const UserArticle = styled.article`
  width: calc(14vw);
  max-width: 120px;

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between; 
  ${({ theme }) => theme.typography.Body_01_2};
`;

const ArtistName = styled.div`
  text-decoration: none;
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
  cursor: pointer;
`;

const EditToggle = styled.div`
  width: 50px;
  text-align: center;
  text-decoration: none;
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
  cursor: pointer;
`;

export default UserComp;