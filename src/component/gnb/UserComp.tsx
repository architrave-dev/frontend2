import React, { useState } from 'react';
import styled from 'styled-components';

const UserComp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);


  const toggleEditMode = () => {
    if (!isLoggedIn) {
      return;
    }
    setIsEditMode(prev => !prev);
  };

  const showLoginModal = () => {
    if (isEditMode) {
      alert("isEditMode가 true일 때 isLoggedIn는 false가 될 수 없다");
      return;
    }
    setIsLoggedIn(prev => !prev);
  };

  return (
    <UserArticle>
      <EditToggle isVisible={isLoggedIn} onClick={toggleEditMode}>
        {isLoggedIn && (isEditMode ? '완료' : '편집')}
      </EditToggle>
      <ArtistName onClick={showLoginModal}>이름</ArtistName>
    </UserArticle>
  );
}

interface EditToggleProps {
  isVisible: boolean;
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

const EditToggle = styled.div<EditToggleProps>`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')}; 
  text-decoration: none;
  &:hover {
    text-decoration: ${({ theme }) => theme.fontWeight.decoration};
  }
  cursor: pointer;
`;

export default UserComp;