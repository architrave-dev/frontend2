import React from 'react';
import styled from 'styled-components';
import { ModalType, useAuthStore } from '../../shared/store';

const UserComp: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isEditMode = useAuthStore((state) => state.isEditMode);
  const setModalType = useAuthStore((state) => state.setModalType);
  const setIsEditMode = useAuthStore((state) => state.setIsEditMode);

  const toggleEditMode = () => {
    if (!isLoggedIn) {
      return;
    }
    setIsEditMode(!isEditMode);
  };

  const showLoginModal = () => {
    if (isLoggedIn) {
      alert("로그아웃 할래?");
    } else {
      console.log("login Modal 나타나랏!");
      setModalType(ModalType.LOGIN);
    }
  };

  return (
    <UserArticle>
      <EditToggle $isVisible={isLoggedIn} onClick={toggleEditMode}>
        {isLoggedIn && (isEditMode ? '완료' : '편집')}
      </EditToggle>
      <ArtistName onClick={showLoginModal}>이름</ArtistName>
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

const EditToggle = styled.div<{ $isVisible: boolean }>`
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')}; 
  text-decoration: none;
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
  cursor: pointer;
`;

export default UserComp;